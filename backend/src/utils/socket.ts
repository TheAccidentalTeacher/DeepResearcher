import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { prisma } from './database';
import logger from './logger';
import { SOCKET_EVENTS, SocketEvents } from '@deepresearcher/shared';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  sessionIds?: Set<string>;
  authenticated?: boolean;
}

let io: SocketIOServer;
const connectedUsers = new Map<string, Set<string>>(); // userId -> Set of socket IDs
const socketSessions = new Map<string, Set<string>>(); // socketId -> Set of session IDs

export function setupSocketIO(server: HTTPServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Authentication middleware
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
      
      if (!token) {
        // Allow unauthenticated connections for public features
        socket.authenticated = false;
        return next();
      }

      const jwtSecret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
      if (!jwtSecret) {
        return next(new Error('Authentication configuration error'));
      }

      const decoded = jwt.verify(token.replace('Bearer ', ''), jwtSecret) as any;
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.sub || decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        socket.authenticated = false;
        return next();
      }

      socket.userId = user.id;
      socket.authenticated = true;
      socket.sessionIds = new Set<string>();

      logger.info('Socket authenticated', {
        socketId: socket.id,
        userId: user.id,
        email: user.email,
      });

      next();
    } catch (error) {
      // Allow connection but mark as unauthenticated
      socket.authenticated = false;
      next();
    }
  });

  // Connection handling
  io.on(SOCKET_EVENTS.CONNECTION, (socket: AuthenticatedSocket) => {
    logger.info('Socket connected', {
      socketId: socket.id,
      userId: socket.userId,
      authenticated: socket.authenticated,
    });

    // Track connected users
    if (socket.userId) {
      if (!connectedUsers.has(socket.userId)) {
        connectedUsers.set(socket.userId, new Set());
      }
      connectedUsers.get(socket.userId)!.add(socket.id);
    }

    socketSessions.set(socket.id, new Set());

    // Join session room
    socket.on(SOCKET_EVENTS.JOIN_SESSION, (data: { sessionId: string }) => {
      if (!socket.authenticated) {
        socket.emit('error', { message: 'Authentication required' });
        return;
      }

      const { sessionId } = data;
      
      // Verify user has access to this session
      if (socket.userId) {
        prisma.researchSession.findFirst({
          where: {
            id: sessionId,
            userId: socket.userId,
          },
        }).then((session: any) => {
          if (session) {
            socket.join(`session:${sessionId}`);
            socket.sessionIds?.add(sessionId);
            socketSessions.get(socket.id)?.add(sessionId);
            
            logger.info('Socket joined session', {
              socketId: socket.id,
              userId: socket.userId,
              sessionId,
            });

            socket.emit('session_joined', { sessionId });
          } else {
            socket.emit('error', { message: 'Session not found or access denied' });
          }
        }).catch((error: any) => {
          logger.error('Error joining session:', error);
          socket.emit('error', { message: 'Failed to join session' });
        });
      }
    });

    // Leave session room
    socket.on(SOCKET_EVENTS.LEAVE_SESSION, (data: { sessionId: string }) => {
      const { sessionId } = data;
      
      socket.leave(`session:${sessionId}`);
      socket.sessionIds?.delete(sessionId);
      socketSessions.get(socket.id)?.delete(sessionId);
      
      logger.info('Socket left session', {
        socketId: socket.id,
        userId: socket.userId,
        sessionId,
      });

      socket.emit('session_left', { sessionId });
    });

    // Handle disconnection
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      logger.info('Socket disconnected', {
        socketId: socket.id,
        userId: socket.userId,
      });

      // Clean up user tracking
      if (socket.userId) {
        const userSockets = connectedUsers.get(socket.userId);
        if (userSockets) {
          userSockets.delete(socket.id);
          if (userSockets.size === 0) {
            connectedUsers.delete(socket.userId);
          }
        }
      }

      // Clean up session tracking
      socketSessions.delete(socket.id);
    });
  });

  logger.info('Socket.IO server initialized');
  return io;
}

// Emit to specific user
export function emitToUser(userId: string, event: string, data: any): void {
  const userSockets = connectedUsers.get(userId);
  if (userSockets) {
    userSockets.forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  }
}

// Emit to specific session
export function emitToSession(sessionId: string, event: string, data: any): void {
  io.to(`session:${sessionId}`).emit(event, data);
}

// Emit research progress update
export function emitResearchProgress(
  sessionId: string,
  progress: number,
  currentStep: string,
  estimatedTimeRemaining?: number
): void {
  emitToSession(sessionId, SOCKET_EVENTS.RESEARCH_PROGRESS, {
    sessionId,
    progress,
    currentStep,
    estimatedTimeRemaining,
  });
}

// Emit research completion
export function emitResearchCompleted(sessionId: string, results: any): void {
  emitToSession(sessionId, SOCKET_EVENTS.RESEARCH_COMPLETED, {
    sessionId,
    results,
  });
}

// Emit research failure
export function emitResearchFailed(sessionId: string, error: string): void {
  emitToSession(sessionId, SOCKET_EVENTS.RESEARCH_FAILED, {
    sessionId,
    error,
  });
}

// Emit new sources found
export function emitNewSourcesFound(sessionId: string, sources: any[]): void {
  emitToSession(sessionId, SOCKET_EVENTS.NEW_SOURCES_FOUND, {
    sessionId,
    sources,
  });
}

// Emit insights generated
export function emitInsightsGenerated(sessionId: string, insights: any[]): void {
  emitToSession(sessionId, SOCKET_EVENTS.INSIGHTS_GENERATED, {
    sessionId,
    insights,
  });
}

// Emit notification
export function emitNotification(userId: string, notification: any): void {
  emitToUser(userId, SOCKET_EVENTS.NEW_NOTIFICATION, notification);
}

// Get connected users count
export function getConnectedUsersCount(): number {
  return connectedUsers.size;
}

// Get user connection status
export function isUserConnected(userId: string): boolean {
  return connectedUsers.has(userId);
}

// Get session participants count
export function getSessionParticipantsCount(sessionId: string): number {
  return io.sockets.adapter.rooms.get(`session:${sessionId}`)?.size || 0;
}

// Broadcast to all connected clients
export function broadcast(event: string, data: any): void {
  io.emit(event, data);
}

// Get socket.io instance
export function getSocketIOInstance(): SocketIOServer {
  return io;
}

// Socket.IO health check
export function checkSocketIOHealth() {
  try {
    const connectedCount = io.engine.clientsCount;
    const roomsCount = io.sockets.adapter.rooms.size;
    
    return {
      status: 'healthy',
      connectedClients: connectedCount,
      rooms: roomsCount,
      authenticatedUsers: connectedUsers.size,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error('Socket.IO health check failed:', error);
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}
