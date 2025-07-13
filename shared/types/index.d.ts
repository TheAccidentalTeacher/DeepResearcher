import { z } from 'zod';
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    RESEARCHER = "RESEARCHER"
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
export declare enum ResearchStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
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
export declare enum SourceType {
    ACADEMIC = "academic",
    NEWS = "news",
    WEB = "web",
    BOOKS = "books",
    PATENTS = "patents",
    PREPRINTS = "preprints"
}
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
export declare enum JobType {
    RESEARCH_QUERY = "research_query",
    SOURCE_FETCH = "source_fetch",
    CONTENT_ANALYSIS = "content_analysis",
    CITATION_GENERATION = "citation_generation",
    REPORT_GENERATION = "report_generation",
    NOTIFICATION = "notification"
}
export declare enum JobStatus {
    WAITING = "waiting",
    ACTIVE = "active",
    COMPLETED = "completed",
    FAILED = "failed",
    DELAYED = "delayed",
    PAUSED = "paused"
}
export declare const ResearchQuerySchema: z.ZodObject<{
    query: z.ZodString;
    options: z.ZodDefault<z.ZodObject<{
        depth: z.ZodDefault<z.ZodEnum<["quick", "standard", "comprehensive"]>>;
        sources: z.ZodDefault<z.ZodArray<z.ZodNativeEnum<typeof SourceType>, "many">>;
        timeframe: z.ZodOptional<z.ZodEnum<["last_day", "last_week", "last_month", "last_year", "all_time"]>>;
        background: z.ZodDefault<z.ZodBoolean>;
        language: z.ZodDefault<z.ZodString>;
        maxSources: z.ZodDefault<z.ZodNumber>;
        includeImages: z.ZodDefault<z.ZodBoolean>;
        includeVideos: z.ZodDefault<z.ZodBoolean>;
        citationStyle: z.ZodDefault<z.ZodEnum<["apa", "mla", "chicago", "ieee"]>>;
    }, "strip", z.ZodTypeAny, {
        depth: "quick" | "standard" | "comprehensive";
        sources: SourceType[];
        background: boolean;
        language: string;
        maxSources: number;
        includeImages: boolean;
        includeVideos: boolean;
        citationStyle: "apa" | "mla" | "chicago" | "ieee";
        timeframe?: "last_day" | "last_week" | "last_month" | "last_year" | "all_time" | undefined;
    }, {
        depth?: "quick" | "standard" | "comprehensive" | undefined;
        sources?: SourceType[] | undefined;
        timeframe?: "last_day" | "last_week" | "last_month" | "last_year" | "all_time" | undefined;
        background?: boolean | undefined;
        language?: string | undefined;
        maxSources?: number | undefined;
        includeImages?: boolean | undefined;
        includeVideos?: boolean | undefined;
        citationStyle?: "apa" | "mla" | "chicago" | "ieee" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    options: {
        depth: "quick" | "standard" | "comprehensive";
        sources: SourceType[];
        background: boolean;
        language: string;
        maxSources: number;
        includeImages: boolean;
        includeVideos: boolean;
        citationStyle: "apa" | "mla" | "chicago" | "ieee";
        timeframe?: "last_day" | "last_week" | "last_month" | "last_year" | "all_time" | undefined;
    };
    query: string;
}, {
    query: string;
    options?: {
        depth?: "quick" | "standard" | "comprehensive" | undefined;
        sources?: SourceType[] | undefined;
        timeframe?: "last_day" | "last_week" | "last_month" | "last_year" | "all_time" | undefined;
        background?: boolean | undefined;
        language?: string | undefined;
        maxSources?: number | undefined;
        includeImages?: boolean | undefined;
        includeVideos?: boolean | undefined;
        citationStyle?: "apa" | "mla" | "chicago" | "ieee" | undefined;
    } | undefined;
}>;
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
export declare enum NotificationType {
    RESEARCH_COMPLETED = "research_completed",
    RESEARCH_FAILED = "research_failed",
    NEW_INSIGHTS = "new_insights",
    SCHEDULED_UPDATE = "scheduled_update",
    SYSTEM_MESSAGE = "system_message"
}
export interface SocketEvents {
    join_session: {
        sessionId: string;
    };
    leave_session: {
        sessionId: string;
    };
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
export declare class ResearchError extends Error {
    code: string;
    statusCode: number;
    details?: any | undefined;
    constructor(message: string, code: string, statusCode?: number, details?: any | undefined);
}
export declare class ValidationError extends ResearchError {
    constructor(message: string, details?: any);
}
export declare class RateLimitError extends ResearchError {
    constructor(message?: string);
}
export declare class ExternalAPIError extends ResearchError {
    constructor(message: string, service: string, details?: any);
}
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
//# sourceMappingURL=index.d.ts.map