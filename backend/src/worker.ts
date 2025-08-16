import dotenv from 'dotenv';
import { Worker } from 'bullmq';
import logger from './utils/logger';
import { initializeRedis } from './utils/redis';
import { JOB_QUEUES } from './constants/index';

// Load environment variables
dotenv.config();

async function startWorker() {
  try {
    // Initialize Redis connection
    await initializeRedis();
    logger.info('Worker Redis connection established');

    // Create workers for different job types
    const researchWorker = new Worker(JOB_QUEUES.RESEARCH, async (job) => {
      logger.info(`Processing research job: ${job.id}`, { data: job.data });
      
      // TODO: Implement actual research processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { status: 'completed', message: 'Research job completed' };
    });

    const sourceWorker = new Worker(JOB_QUEUES.SOURCE_FETCHING, async (job) => {
      logger.info(`Processing source fetching job: ${job.id}`, { data: job.data });
      
      // TODO: Implement actual source fetching
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { status: 'completed', message: 'Source fetching completed' };
    });

    const analysisWorker = new Worker(JOB_QUEUES.CONTENT_ANALYSIS, async (job) => {
      logger.info(`Processing content analysis job: ${job.id}`, { data: job.data });
      
      // TODO: Implement actual content analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { status: 'completed', message: 'Content analysis completed' };
    });

    const notificationWorker = new Worker(JOB_QUEUES.NOTIFICATIONS, async (job) => {
      logger.info(`Processing notification job: ${job.id}`, { data: job.data });
      
      // TODO: Implement actual notification sending
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return { status: 'completed', message: 'Notification sent' };
    });

    // Worker event handlers
    const workers = [researchWorker, sourceWorker, analysisWorker, notificationWorker];
    
    workers.forEach((worker, index) => {
      const workerName = ['research', 'source', 'analysis', 'notification'][index];
      
      worker.on('completed', (job) => {
        logger.info(`${workerName} job completed: ${job.id}`);
      });

      worker.on('failed', (job, err) => {
        logger.error(`${workerName} job failed: ${job?.id}`, { error: err.message });
      });

      worker.on('error', (err) => {
        logger.error(`${workerName} worker error:`, { error: err.message });
      });
    });

    logger.info('🔄 Background workers started successfully');

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down workers...');
      await Promise.all(workers.map(worker => worker.close()));
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    logger.error('Failed to start worker:', error);
    process.exit(1);
  }
}

startWorker();
