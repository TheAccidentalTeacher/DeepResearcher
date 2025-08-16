import { Queue, Worker, Job, QueueEvents } from 'bullmq';
import { getRedisClient } from './redis';
import logger from './logger';
import { JobType, JobStatus } from '../types/index';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

// Job data interfaces
export interface ResearchJobData {
  sessionId: string;
  userId: string;
  query: string;
  options: any;
}

export interface SourceFetchJobData {
  sessionId: string;
  sourceType: string;
  query: string;
  options: any;
}

export interface ContentAnalysisJobData {
  sessionId: string;
  sourceId: string;
  content: string;
}

export interface CitationGenerationJobData {
  sessionId: string;
  sourceIds: string[];
  style: string;
}

export interface ReportGenerationJobData {
  sessionId: string;
  format: string;
}

export interface NotificationJobData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}

// Queue instances
let researchQueue: Queue<ResearchJobData>;
let sourceFetchQueue: Queue<SourceFetchJobData>;
let contentAnalysisQueue: Queue<ContentAnalysisJobData>;
let citationGenerationQueue: Queue<CitationGenerationJobData>;
let reportGenerationQueue: Queue<ReportGenerationJobData>;
let notificationQueue: Queue<NotificationJobData>;

// Queue events
let queueEvents: QueueEvents;

// Bull Board for monitoring
let bullBoard: any;
let serverAdapter: ExpressAdapter;

export async function initializeQueue() {
  try {
    const redis = getRedisClient();

    // Initialize queues
    researchQueue = new Queue<ResearchJobData>('research', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 100,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });

    sourceFetchQueue = new Queue<SourceFetchJobData>('source-fetch', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 200,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    });

    contentAnalysisQueue = new Queue<ContentAnalysisJobData>('content-analysis', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 100,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    });

    citationGenerationQueue = new Queue<CitationGenerationJobData>('citation-generation', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 50,
        attempts: 2,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    });

    reportGenerationQueue = new Queue<ReportGenerationJobData>('report-generation', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 20,
        removeOnFail: 50,
        attempts: 2,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });

    notificationQueue = new Queue<NotificationJobData>('notification', {
      connection: redis,
      defaultJobOptions: {
        removeOnComplete: 200,
        removeOnFail: 100,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    });

    // Initialize queue events for monitoring
    queueEvents = new QueueEvents('research', { connection: redis });

    // Setup Bull Board for queue monitoring
    serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    bullBoard = createBullBoard({
      queues: [
        new BullMQAdapter(researchQueue) as any,
        new BullMQAdapter(sourceFetchQueue) as any,
        new BullMQAdapter(contentAnalysisQueue) as any,
        new BullMQAdapter(citationGenerationQueue) as any,
        new BullMQAdapter(reportGenerationQueue) as any,
        new BullMQAdapter(notificationQueue) as any,
      ],
      serverAdapter,
    });

    // Setup queue event listeners
    setupQueueEventListeners();

    logger.info('Background job queues initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize queue:', error);
    throw error;
  }
}

function setupQueueEventListeners() {
  // Research queue events
  queueEvents.on('completed', (jobInfo) => {
    logger.info('Job completed', {
      jobId: jobInfo.jobId,
      queue: 'research',
      returnValue: jobInfo.returnvalue,
    });
  });

  queueEvents.on('failed', (jobInfo) => {
    logger.error('Job failed', {
      jobId: jobInfo.jobId,
      queue: 'research',
      error: jobInfo.failedReason,
    });
  });

  queueEvents.on('progress', (jobInfo) => {
    logger.debug('Job progress', {
      jobId: jobInfo.jobId,
      queue: 'research',
      progress: jobInfo.data,
    });
  });
}

// Job creation functions
export async function addResearchJob(
  data: ResearchJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<ResearchJobData>> {
  return researchQueue.add('research-query', data, {
    priority: options.priority || 5,
    delay: options.delay || 0,
    attempts: options.attempts || 3,
  });
}

export async function addSourceFetchJob(
  data: SourceFetchJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<SourceFetchJobData>> {
  return sourceFetchQueue.add('source-fetch', data, {
    priority: options.priority || 5,
    delay: options.delay || 0,
    attempts: options.attempts || 5,
  });
}

export async function addContentAnalysisJob(
  data: ContentAnalysisJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<ContentAnalysisJobData>> {
  return contentAnalysisQueue.add('content-analysis', data, {
    priority: options.priority || 5,
    delay: options.delay || 0,
    attempts: options.attempts || 3,
  });
}

export async function addCitationGenerationJob(
  data: CitationGenerationJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<CitationGenerationJobData>> {
  return citationGenerationQueue.add('citation-generation', data, {
    priority: options.priority || 5,
    delay: options.delay || 0,
    attempts: options.attempts || 2,
  });
}

export async function addReportGenerationJob(
  data: ReportGenerationJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<ReportGenerationJobData>> {
  return reportGenerationQueue.add('report-generation', data, {
    priority: options.priority || 5,
    delay: options.delay || 0,
    attempts: options.attempts || 2,
  });
}

export async function addNotificationJob(
  data: NotificationJobData,
  options: {
    priority?: number;
    delay?: number;
    attempts?: number;
  } = {}
): Promise<Job<NotificationJobData>> {
  return notificationQueue.add('notification', data, {
    priority: options.priority || 1,
    delay: options.delay || 0,
    attempts: options.attempts || 3,
  });
}

// Queue status functions
export async function getQueueStats() {
  const [
    researchStats,
    sourceFetchStats,
    contentAnalysisStats,
    citationStats,
    reportStats,
    notificationStats,
  ] = await Promise.all([
    getQueueCounts(researchQueue),
    getQueueCounts(sourceFetchQueue),
    getQueueCounts(contentAnalysisQueue),
    getQueueCounts(citationGenerationQueue),
    getQueueCounts(reportGenerationQueue),
    getQueueCounts(notificationQueue),
  ]);

  return {
    research: researchStats,
    sourceFetch: sourceFetchStats,
    contentAnalysis: contentAnalysisStats,
    citationGeneration: citationStats,
    reportGeneration: reportStats,
    notification: notificationStats,
  };
}

async function getQueueCounts(queue: Queue) {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    queue.getWaiting(),
    queue.getActive(),
    queue.getCompleted(),
    queue.getFailed(),
    queue.getDelayed(),
  ]);

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length,
    delayed: delayed.length,
  };
}

// Job retrieval functions
export async function getJob(queueName: string, jobId: string): Promise<Job | null> {
  const queue = getQueueByName(queueName);
  if (!queue) {
    throw new Error(`Queue ${queueName} not found`);
  }
  return queue.getJob(jobId);
}

export async function getJobs(
  queueName: string,
  type: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed' = 'waiting',
  start = 0,
  end = 10
): Promise<Job[]> {
  const queue = getQueueByName(queueName);
  if (!queue) {
    throw new Error(`Queue ${queueName} not found`);
  }

  switch (type) {
    case 'waiting':
      return queue.getWaiting(start, end);
    case 'active':
      return queue.getActive(start, end);
    case 'completed':
      return queue.getCompleted(start, end);
    case 'failed':
      return queue.getFailed(start, end);
    case 'delayed':
      return queue.getDelayed(start, end);
    default:
      return [];
  }
}

function getQueueByName(queueName: string): Queue | null {
  switch (queueName) {
    case 'research':
      return researchQueue;
    case 'source-fetch':
      return sourceFetchQueue;
    case 'content-analysis':
      return contentAnalysisQueue;
    case 'citation-generation':
      return citationGenerationQueue;
    case 'report-generation':
      return reportGenerationQueue;
    case 'notification':
      return notificationQueue;
    default:
      return null;
  }
}

// Queue cleanup functions
export async function cleanAllQueues(): Promise<void> {
  const queues = [
    researchQueue,
    sourceFetchQueue,
    contentAnalysisQueue,
    citationGenerationQueue,
    reportGenerationQueue,
    notificationQueue,
  ];

  await Promise.all(
    queues.map(async (queue) => {
      await queue.clean(24 * 60 * 60 * 1000, 100, 'completed'); // Clean completed jobs older than 24 hours
      await queue.clean(7 * 24 * 60 * 60 * 1000, 100, 'failed'); // Clean failed jobs older than 7 days
    })
  );

  logger.info('All queues cleaned');
}

// Bull Board getter
export function getBullBoardServerAdapter(): ExpressAdapter {
  return serverAdapter;
}

// Queue health check
export async function checkQueueHealth() {
  try {
    const stats = await getQueueStats();
    
    return {
      status: 'healthy',
      queues: stats,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error('Queue health check failed:', error);
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
}
