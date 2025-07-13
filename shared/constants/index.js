"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = exports.STATUS_MESSAGES = exports.SUPPORTED_LANGUAGES = exports.CITATION_STYLES = exports.APP_CONFIG = exports.JOB_CONFIG = exports.EXTERNAL_APIS = exports.RESEARCH_CONFIG = exports.SOCKET_EVENTS = exports.API_ENDPOINTS = void 0;
// API Endpoints
exports.API_ENDPOINTS = {
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
        GET_BY_ID: (id) => `/api/research/${id}`,
        GET_STATUS: (id) => `/api/research/${id}/status`,
        GET_RESULTS: (id) => `/api/research/${id}/results`,
        CANCEL: (id) => `/api/research/${id}/cancel`,
        LIST: '/api/research',
        DELETE: (id) => `/api/research/${id}`,
    },
    // Sources
    SOURCES: {
        SEARCH: '/api/sources/search',
        GET_BY_ID: (id) => `/api/sources/${id}`,
        GET_CONTENT: (id) => `/api/sources/${id}/content`,
    },
    // Citations
    CITATIONS: {
        GENERATE: '/api/citations/generate',
        EXPORT: '/api/citations/export',
    },
    // Notifications
    NOTIFICATIONS: {
        LIST: '/api/notifications',
        MARK_READ: (id) => `/api/notifications/${id}/read`,
        MARK_ALL_READ: '/api/notifications/read-all',
        DELETE: (id) => `/api/notifications/${id}`,
    },
    // Export
    EXPORT: {
        PDF: (sessionId) => `/api/export/${sessionId}/pdf`,
        WORD: (sessionId) => `/api/export/${sessionId}/word`,
        MARKDOWN: (sessionId) => `/api/export/${sessionId}/markdown`,
        BIBTEX: (sessionId) => `/api/export/${sessionId}/bibtex`,
    },
    // Admin
    ADMIN: {
        JOBS: '/api/admin/jobs',
        STATS: '/api/admin/stats',
        USERS: '/api/admin/users',
        LOGS: '/api/admin/logs',
    },
};
// WebSocket Events
exports.SOCKET_EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    // Research events
    JOIN_SESSION: 'join_session',
    LEAVE_SESSION: 'leave_session',
    RESEARCH_PROGRESS: 'research_progress',
    RESEARCH_COMPLETED: 'research_completed',
    RESEARCH_FAILED: 'research_failed',
    NEW_SOURCES_FOUND: 'new_sources_found',
    INSIGHTS_GENERATED: 'insights_generated',
    // Notification events
    NEW_NOTIFICATION: 'new_notification',
    NOTIFICATION_READ: 'notification_read',
};
// Research Configuration
exports.RESEARCH_CONFIG = {
    MAX_QUERY_LENGTH: 1000,
    MIN_QUERY_LENGTH: 1,
    DEPTH_SETTINGS: {
        quick: {
            maxSources: 10,
            maxSteps: 3,
            estimatedDuration: 30, // seconds
        },
        standard: {
            maxSources: 25,
            maxSteps: 5,
            estimatedDuration: 120, // seconds
        },
        comprehensive: {
            maxSources: 50,
            maxSteps: 8,
            estimatedDuration: 300, // seconds
        },
    },
    SOURCE_LIMITS: {
        academic: 30,
        news: 20,
        web: 25,
        books: 15,
        patents: 10,
        preprints: 20,
    },
    TIMEFRAMES: {
        last_day: { days: 1 },
        last_week: { days: 7 },
        last_month: { days: 30 },
        last_year: { days: 365 },
        all_time: null,
    },
};
// External API Configuration
exports.EXTERNAL_APIS = {
    ARXIV: {
        BASE_URL: 'http://export.arxiv.org/api/query',
        MAX_RESULTS: 100,
        RATE_LIMIT: 3, // requests per second
    },
    PUBMED: {
        BASE_URL: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
        MAX_RESULTS: 200,
        RATE_LIMIT: 10, // requests per second
    },
    SEMANTIC_SCHOLAR: {
        BASE_URL: 'https://api.semanticscholar.org/graph/v1',
        MAX_RESULTS: 100,
        RATE_LIMIT: 100, // requests per 5 minutes
    },
    CROSSREF: {
        BASE_URL: 'https://api.crossref.org',
        MAX_RESULTS: 1000,
        RATE_LIMIT: 50, // requests per second
    },
    NEWS_API: {
        BASE_URL: 'https://newsapi.org/v2',
        MAX_RESULTS: 100,
        RATE_LIMIT: 1000, // requests per day
    },
    OPENAI: {
        MODELS: {
            GPT_4: 'gpt-4',
            GPT_4_TURBO: 'gpt-4-1106-preview',
            GPT_3_5_TURBO: 'gpt-3.5-turbo',
        },
        MAX_TOKENS: {
            GPT_4: 8192,
            GPT_4_TURBO: 128000,
            GPT_3_5_TURBO: 4096,
        },
        TEMPERATURE: 0.7,
        TOP_P: 0.9,
    },
};
// Background Job Configuration
exports.JOB_CONFIG = {
    CONCURRENCY: {
        research_query: 2,
        source_fetch: 5,
        content_analysis: 3,
        citation_generation: 2,
        report_generation: 1,
        notification: 10,
    },
    RETRY_ATTEMPTS: {
        research_query: 3,
        source_fetch: 5,
        content_analysis: 3,
        citation_generation: 2,
        report_generation: 2,
        notification: 3,
    },
    RETRY_DELAYS: {
        research_query: 5000, // 5 seconds
        source_fetch: 2000, // 2 seconds
        content_analysis: 3000, // 3 seconds
        citation_generation: 2000, // 2 seconds
        report_generation: 5000, // 5 seconds
        notification: 1000, // 1 second
    },
    PRIORITIES: {
        HIGH: 1,
        NORMAL: 5,
        LOW: 10,
    },
};
// Application Constants
exports.APP_CONFIG = {
    NAME: 'Deep Research Assistant',
    VERSION: '1.0.0',
    DESCRIPTION: 'Autonomous, AI-Powered, Background-Capable Research Platform',
    PAGINATION: {
        DEFAULT_LIMIT: 20,
        MAX_LIMIT: 100,
    },
    FILE_UPLOAD: {
        MAX_SIZE: 10 * 1024 * 1024, // 10MB
        ALLOWED_TYPES: ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    },
    RATE_LIMITS: {
        RESEARCH_QUERIES: {
            window: 15 * 60 * 1000, // 15 minutes
            max: 10, // 10 queries per 15 minutes
        },
        API_CALLS: {
            window: 15 * 60 * 1000, // 15 minutes
            max: 1000, // 1000 calls per 15 minutes
        },
    },
    SESSION: {
        COOKIE_NAME: 'deepresearcher-session',
        MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    CACHE: {
        TTL: {
            RESEARCH_RESULTS: 24 * 60 * 60, // 24 hours
            SOURCE_CONTENT: 7 * 24 * 60 * 60, // 7 days
            API_RESPONSES: 60 * 60, // 1 hour
        },
    },
};
// Citation Styles
exports.CITATION_STYLES = {
    APA: 'apa',
    MLA: 'mla',
    CHICAGO: 'chicago',
    IEEE: 'ieee',
};
// Supported Languages
exports.SUPPORTED_LANGUAGES = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
};
// Status Messages
exports.STATUS_MESSAGES = {
    RESEARCH: {
        PENDING: 'Research request received and queued',
        RUNNING: 'Research in progress',
        COMPLETED: 'Research completed successfully',
        FAILED: 'Research failed to complete',
        CANCELLED: 'Research was cancelled',
    },
    STEPS: {
        INITIALIZING: 'Initializing research session',
        QUERY_ANALYSIS: 'Analyzing query and planning research strategy',
        SOURCE_DISCOVERY: 'Discovering relevant sources',
        CONTENT_RETRIEVAL: 'Retrieving and processing content',
        ANALYSIS: 'Analyzing and synthesizing information',
        CITATION_GENERATION: 'Generating citations and references',
        INSIGHT_EXTRACTION: 'Extracting insights and trends',
        REPORT_GENERATION: 'Generating final report',
        FINALIZING: 'Finalizing results',
    },
};
// Error Codes
exports.ERROR_CODES = {
    // Validation errors (400)
    INVALID_QUERY: 'INVALID_QUERY',
    INVALID_OPTIONS: 'INVALID_OPTIONS',
    MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
    // Authentication errors (401)
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_TOKEN: 'INVALID_TOKEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    // Authorization errors (403)
    FORBIDDEN: 'FORBIDDEN',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    // Not found errors (404)
    SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    // Rate limit errors (429)
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
    // Server errors (500)
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
    JOB_EXECUTION_ERROR: 'JOB_EXECUTION_ERROR',
    // Service errors (502, 503)
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
};
//# sourceMappingURL=index.js.map