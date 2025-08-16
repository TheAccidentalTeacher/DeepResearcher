import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.development' });

import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';
import { authMiddleware } from './middleware/auth';
import logger from './utils/logger';
import { initializeDatabase } from './utils/database';
import { initializeRedis } from './utils/redis';
import { initializeQueue } from './utils/queue';
import { setupSocketIO } from './utils/socket';

// Import routes
import authRoutes from './routes/auth';
import researchRoutes from './routes/research';
import sourcesRoutes from './routes/sources';
import citationsRoutes from './routes/citations';
import notificationsRoutes from './routes/notifications';
import exportRoutes from './routes/export';
import adminRoutes from './routes/admin';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    // Conditionally initialize database
    if (!process.env.SKIP_DATABASE) {
      await initializeDatabase();
      logger.info('Database connected successfully');
    } else {
      logger.info('Skipping database connection (SKIP_DATABASE=true)');
    }

    // Conditionally initialize Redis
    if (!process.env.SKIP_REDIS) {
      await initializeRedis();
      logger.info('Redis connected successfully');
    } else {
      logger.info('Skipping Redis connection (SKIP_REDIS=true)');
    }

    // Conditionally initialize background job queue
    if (!process.env.SKIP_QUEUE) {
      await initializeQueue();
      logger.info('Background job queue initialized');
    } else {
      logger.info('Skipping background job queue (SKIP_QUEUE=true)');
    }

    // Security middleware
    app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration
    app.use(cors({
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));

    // General middleware
    app.use(compression());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.use(requestLogger);

    // Rate limiting
    app.use(rateLimiter);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        message: 'Deep Research Assistant API is running on Railway',
        timestamp: new Date().toISOString(),
        platform: 'railway',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      });
    });

    app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        message: 'Deep Research Assistant API is running on Railway',
        timestamp: new Date().toISOString(),
        platform: 'railway',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      });
    });

    // API routes
    app.use('/api/auth', authRoutes);
    // Skip auth middleware for development
    app.use('/api/research', researchRoutes);
    app.use('/api/sources', sourcesRoutes);
    app.use('/api/citations', citationsRoutes);
    app.use('/api/notifications', notificationsRoutes);
    app.use('/api/export', exportRoutes);
    app.use('/api/admin', adminRoutes);

    // Setup Socket.IO
    setupSocketIO(server);

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'API endpoint not found',
        },
      });
    });

    // Error handling middleware (must be last)
    app.use(errorHandler);

    // Start server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📖 API documentation: http://localhost:${PORT}/health`);
      logger.info(`🔄 Socket.IO server running`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  logger.info(`Received ${signal}. Graceful shutdown starting...`);
  
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Forceful shutdown');
    process.exit(1);
  }, 10000);
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();
