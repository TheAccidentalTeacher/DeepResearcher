import { z } from 'zod';

// User types
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  RESEARCHER = 'RESEARCHER',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Research Session types
export interface ResearchSession {
  id: string;
  userId: string;
  title: string;
  query: string;
  status: ResearchStatus;
  options: ResearchOptions;
  results?: ResearchResults;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export enum ResearchStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export interface ResearchOptions {
  depth: 'quick' | 'standard' | 'comprehensive';
  sources: SourceType[];
  timeframe?: 'last_day' | 'last_week' | 'last_month' | 'last_year' | 'all_time';
  background?: boolean;
  language?: string;
  maxSources?: number;
  includeImages?: boolean;
  includeVideos?: boolean;
  citationStyle?: 'apa' | 'mla' | 'chicago' | 'ieee';
}

export enum SourceType {
  ACADEMIC = 'academic',
  NEWS = 'news',
  WEB = 'web',
  BOOKS = 'books',
  PATENTS = 'patents',
  PREPRINTS = 'preprints',
}

// Research Results types
export interface ResearchResults {
  summary: Summary;
  sources: Source[];
  citations: Citation[];
  insights: Insight[];
  relatedTopics: string[];
  confidence: number;
  completeness: number;
}

export interface Summary {
  executive: string;
  detailed: string;
  keyPoints: string[];
  methodology: string;
  limitations?: string[];
}

export interface Source {
  id: string;
  title: string;
  authors?: string[];
  url: string;
  type: SourceType;
  publishedAt?: Date;
  abstract?: string;
  content?: string;
  relevanceScore: number;
  credibilityScore: number;
  doi?: string;
  journal?: string;
  venue?: string;
  tags: string[];
}

export interface Citation {
  id: string;
  sourceId: string;
  text: string;
  context: string;
  style: string;
  inline: string;
}

export interface Insight {
  id: string;
  type: 'trend' | 'gap' | 'contradiction' | 'opportunity' | 'risk';
  title: string;
  description: string;
  evidence: string[];
  confidence: number;
  impact: 'low' | 'medium' | 'high';
}

// Background Job types
export interface BackgroundJob {
  id: string;
  sessionId: string;
  type: JobType;
  status: JobStatus;
  progress: number;
  data: any;
  result?: any;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  retries: number;
  maxRetries: number;
}

export enum JobType {
  RESEARCH_QUERY = 'research_query',
  SOURCE_FETCH = 'source_fetch',
  CONTENT_ANALYSIS = 'content_analysis',
  CITATION_GENERATION = 'citation_generation',
  REPORT_GENERATION = 'report_generation',
  NOTIFICATION = 'notification',
}

export enum JobStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  DELAYED = 'delayed',
  PAUSED = 'paused',
}

// API Request/Response types
export const ResearchQuerySchema = z.object({
  query: z.string().min(1).max(1000),
  options: z.object({
    depth: z.enum(['quick', 'standard', 'comprehensive']).default('standard'),
    sources: z.array(z.nativeEnum(SourceType)).default([SourceType.ACADEMIC, SourceType.WEB]),
    timeframe: z.enum(['last_day', 'last_week', 'last_month', 'last_year', 'all_time']).optional(),
    background: z.boolean().default(false),
    language: z.string().default('en'),
    maxSources: z.number().min(1).max(100).default(20),
    includeImages: z.boolean().default(false),
    includeVideos: z.boolean().default(false),
    citationStyle: z.enum(['apa', 'mla', 'chicago', 'ieee']).default('apa'),
  }).default({}),
});

export type ResearchQueryRequest = z.infer<typeof ResearchQuerySchema>;

export interface ResearchQueryResponse {
  sessionId: string;
  status: ResearchStatus;
  estimatedDuration?: number;
  message: string;
}

export interface ResearchStatusResponse {
  sessionId: string;
  status: ResearchStatus;
  progress: number;
  currentStep: string;
  estimatedTimeRemaining?: number;
  results?: Partial<ResearchResults>;
  error?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  RESEARCH_COMPLETED = 'research_completed',
  RESEARCH_FAILED = 'research_failed',
  NEW_INSIGHTS = 'new_insights',
  SCHEDULED_UPDATE = 'scheduled_update',
  SYSTEM_MESSAGE = 'system_message',
}

// Real-time events
export interface SocketEvents {
  // Client to server
  join_session: { sessionId: string };
  leave_session: { sessionId: string };
  
  // Server to client
  research_progress: {
    sessionId: string;
    progress: number;
    currentStep: string;
    estimatedTimeRemaining?: number;
  };
  research_completed: {
    sessionId: string;
    results: ResearchResults;
  };
  research_failed: {
    sessionId: string;
    error: string;
  };
  new_sources_found: {
    sessionId: string;
    sources: Source[];
  };
  insights_generated: {
    sessionId: string;
    insights: Insight[];
  };
}

// Error types
export class ResearchError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ResearchError';
  }
}

export class ValidationError extends ResearchError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends ResearchError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT_ERROR', 429);
    this.name = 'RateLimitError';
  }
}

export class ExternalAPIError extends ResearchError {
  constructor(message: string, service: string, details?: any) {
    super(message, 'EXTERNAL_API_ERROR', 502, { service, ...details });
    this.name = 'ExternalAPIError';
  }
}

// Utility types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
