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
export enum ResearchStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface ResearchOptions {
  sources?: string[];
  maxSources?: number;
  includeAcademic?: boolean;
  includeNews?: boolean;
  includeWeb?: boolean;
  dateRange?: {
    from?: string;
    to?: string;
  };
  language?: string;
  region?: string;
}

export interface ResearchResults {
  summary: string;
  sources: Source[];
  insights: string[];
  timeline?: TimelineEntry[];
  relatedTopics?: string[];
  confidence: number;
  lastUpdated: Date;
}

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
  progress?: number;
  estimatedTimeRemaining?: number;
  error?: string;
}

// Source types
export enum SourceType {
  ACADEMIC = 'ACADEMIC',
  NEWS = 'NEWS',
  WEB = 'WEB',
  BOOKS = 'BOOKS',
  PATENTS = 'PATENTS',
  PREPRINTS = 'PREPRINTS',
}

export interface Source {
  id: string;
  sessionId: string;
  title: string;
  authors: string[];
  url: string;
  type: SourceType;
  publishedAt?: Date;
  abstract?: string;
  content?: string;
  relevanceScore: number;
  credibilityScore: number;
  venue?: string;
  tags: string[];
  metadata?: any;
}

// Citation types
export interface Citation {
  id: string;
  sourceId: string;
  sessionId: string;
  text: string;
  context: string;
  style: string; // Citation style (APA, MLA, etc.)
  inline: string;
  createdAt: Date;
}

// Timeline types
export interface TimelineEntry {
  id: string;
  sessionId: string;
  date: Date;
  title: string;
  description: string;
  sources: string[];
  importance: number;
}

// Insight types
export enum InsightType {
  TREND = 'TREND',
  GAP = 'GAP',
  CONTRADICTION = 'CONTRADICTION',
  OPPORTUNITY = 'OPPORTUNITY',
  RISK = 'RISK',
}

export enum ImpactLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Insight {
  id: string;
  sessionId: string;
  type: InsightType;
  title: string;
  description: string;
  evidence: string[];
  confidence: number;
  impact: ImpactLevel;
  metadata?: any;
}

// Background Job types
export enum JobType {
  RESEARCH_QUERY = 'RESEARCH_QUERY',
  SOURCE_FETCH = 'SOURCE_FETCH',
  CONTENT_ANALYSIS = 'CONTENT_ANALYSIS',
  CITATION_GENERATION = 'CITATION_GENERATION',
  REPORT_GENERATION = 'REPORT_GENERATION',
  NOTIFICATION = 'NOTIFICATION',
  SCHEDULED_UPDATE = 'SCHEDULED_UPDATE',
}

export enum JobStatus {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DELAYED = 'DELAYED',
  PAUSED = 'PAUSED',
}

export interface BackgroundJob {
  id: string;
  type: JobType;
  status: JobStatus;
  progress: number;
  data?: any;
  result?: any;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

// Notification types
export enum NotificationType {
  RESEARCH_COMPLETED = 'RESEARCH_COMPLETED',
  RESEARCH_FAILED = 'RESEARCH_FAILED',
  NEW_INSIGHTS = 'NEW_INSIGHTS',
  SCHEDULED_UPDATE = 'SCHEDULED_UPDATE',
  SYSTEM_MESSAGE = 'SYSTEM_MESSAGE',
}

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

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code?: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    timestamp: string;
  };
}

// Validation schemas
export const CreateResearchSessionSchema = z.object({
  query: z.string().min(1).max(1000),
  options: z.object({
    sources: z.array(z.string()).optional(),
    maxSources: z.number().min(1).max(100).optional(),
    includeAcademic: z.boolean().optional(),
    includeNews: z.boolean().optional(),
    includeWeb: z.boolean().optional(),
    dateRange: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }).optional(),
    language: z.string().optional(),
    region: z.string().optional(),
  }).optional(),
});

export const UpdateResearchSessionSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  options: z.object({
    sources: z.array(z.string()).optional(),
    maxSources: z.number().min(1).max(100).optional(),
    includeAcademic: z.boolean().optional(),
    includeNews: z.boolean().optional(),
    includeWeb: z.boolean().optional(),
    dateRange: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }).optional(),
    language: z.string().optional(),
    region: z.string().optional(),
  }).optional(),
});

export type CreateResearchSessionRequest = z.infer<typeof CreateResearchSessionSchema>;
export type UpdateResearchSessionRequest = z.infer<typeof UpdateResearchSessionSchema>;
