// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  
  // Research
  RESEARCH: {
    CREATE: '/api/research',
    GET_BY_ID: (id: string) => `/api/research/${id}`,
    GET_STATUS: (id: string) => `/api/research/${id}/status`,
    GET_RESULTS: (id: string) => `/api/research/${id}/results`,
    CANCEL: (id: string) => `/api/research/${id}/cancel`,
    LIST: '/api/research',
    DELETE: (id: string) => `/api/research/${id}`,
  },
  
  // Sources
  SOURCES: {
    SEARCH: '/api/sources/search',
    GET_BY_ID: (id: string) => `/api/sources/${id}`,
    GET_CONTENT: (id: string) => `/api/sources/${id}/content`,
  },
  
  // Citations
  CITATIONS: {
    GENERATE: '/api/citations/generate',
    EXPORT: '/api/citations/export',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
    DELETE: (id: string) => `/api/notifications/${id}`,
  },
  
  // Export
  EXPORT: {
    PDF: (sessionId: string) => `/api/export/${sessionId}/pdf`,
    WORD: (sessionId: string) => `/api/export/${sessionId}/word`,
    MARKDOWN: (sessionId: string) => `/api/export/${sessionId}/markdown`,
    BIBTEX: (sessionId: string) => `/api/export/${sessionId}/bibtex`,
  },
  
  // Admin
  ADMIN: {
    USERS: '/api/admin/users',
    STATS: '/api/admin/stats',
    LOGS: '/api/admin/logs',
    SETTINGS: '/api/admin/settings',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  INVALID_TOKEN: 'INVALID_TOKEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  
  // Research
  RESEARCH_NOT_FOUND: 'RESEARCH_NOT_FOUND',
  RESEARCH_ALREADY_EXISTS: 'RESEARCH_ALREADY_EXISTS',
  RESEARCH_LIMIT_EXCEEDED: 'RESEARCH_LIMIT_EXCEEDED',
  RESEARCH_IN_PROGRESS: 'RESEARCH_IN_PROGRESS',
  
  // Sources
  SOURCE_NOT_FOUND: 'SOURCE_NOT_FOUND',
  SOURCE_FETCH_FAILED: 'SOURCE_FETCH_FAILED',
  SOURCE_PARSE_FAILED: 'SOURCE_PARSE_FAILED',
  
  // General
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Additional error codes used in middleware
  INVALID_OPTIONS: 'INVALID_OPTIONS',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  INVALID_QUERY: 'INVALID_QUERY',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
} as const;

// Configuration Constants
export const CONFIG = {
  // JWT
  JWT: {
    SECRET: process.env.JWT_SECRET || 'default-secret-change-in-production',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  // Database
  DATABASE: {
    URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/deepresearcher',
  },
  
  // Redis
  REDIS: {
    URL: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  
  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    MAX_REQUESTS: parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS || '100'),
    RESEARCH_WINDOW_MS: parseInt(process.env.RESEARCH_RATE_LIMIT_WINDOW_MS || '3600000'), // 1 hour
    RESEARCH_MAX_REQUESTS: parseInt(process.env.RESEARCH_RATE_LIMIT_MAX_REQUESTS || '10'),
  },
  
  // API Keys
  OPENAI: {
    API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // Server
  SERVER: {
    PORT: parseInt(process.env.PORT || '3000'),
    HOST: process.env.HOST || '0.0.0.0',
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  
  // CORS
  CORS: {
    ORIGIN: process.env.FRONTEND_URL || 'http://localhost:3000',
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  },
} as const;

// Queue Constants
export const JOB_QUEUES = {
  RESEARCH: 'research-queue',
  SOURCES: 'sources-queue',
  SOURCE_FETCHING: 'source-fetching-queue',
  CONTENT_ANALYSIS: 'content-analysis-queue',
  NOTIFICATIONS: 'notifications-queue',
  EXPORT: 'export-queue',
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  // Connection events
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_SESSION: 'join:session',
  LEAVE_SESSION: 'leave:session',
  
  // Research events
  RESEARCH_STARTED: 'research:started',
  RESEARCH_PROGRESS: 'research:progress',
  RESEARCH_COMPLETED: 'research:completed',
  RESEARCH_FAILED: 'research:failed',
  
  // Source events
  SOURCE_FOUND: 'source:found',
  SOURCES_UPDATED: 'sources:updated',
  NEW_SOURCES_FOUND: 'sources:new-found',
  
  // Insight events
  INSIGHTS_GENERATED: 'insights:generated',
  
  // Notification events
  NOTIFICATION_NEW: 'notification:new',
  NOTIFICATION_READ: 'notification:read',
  NEW_NOTIFICATION: 'notification:new',
} as const;

export type SocketEvents = typeof SOCKET_EVENTS;

// Default Values
export const DEFAULTS = {
  RESEARCH: {
    MAX_SOURCES: 20,
    TIMEOUT_MINUTES: 30,
    RETRY_ATTEMPTS: 3,
  },
  
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
  
  FILE_UPLOAD: {
    MAX_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
    ALLOWED_TYPES: ['pdf', 'doc', 'docx', 'txt'],
  },
} as const;

// Validation Constants
export const VALIDATION = {
  QUERY: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 1000,
  },
  
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 200,
  },
  
  EMAIL: {
    MAX_LENGTH: 320,
  },
  
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
} as const;
