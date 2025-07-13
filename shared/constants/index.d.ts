export declare const API_ENDPOINTS: {
    readonly AUTH: {
        readonly LOGIN: "/api/auth/login";
        readonly LOGOUT: "/api/auth/logout";
        readonly REGISTER: "/api/auth/register";
        readonly PROFILE: "/api/auth/profile";
    };
    readonly RESEARCH: {
        readonly CREATE: "/api/research";
        readonly GET_BY_ID: (id: string) => string;
        readonly GET_STATUS: (id: string) => string;
        readonly GET_RESULTS: (id: string) => string;
        readonly CANCEL: (id: string) => string;
        readonly LIST: "/api/research";
        readonly DELETE: (id: string) => string;
    };
    readonly SOURCES: {
        readonly SEARCH: "/api/sources/search";
        readonly GET_BY_ID: (id: string) => string;
        readonly GET_CONTENT: (id: string) => string;
    };
    readonly CITATIONS: {
        readonly GENERATE: "/api/citations/generate";
        readonly EXPORT: "/api/citations/export";
    };
    readonly NOTIFICATIONS: {
        readonly LIST: "/api/notifications";
        readonly MARK_READ: (id: string) => string;
        readonly MARK_ALL_READ: "/api/notifications/read-all";
        readonly DELETE: (id: string) => string;
    };
    readonly EXPORT: {
        readonly PDF: (sessionId: string) => string;
        readonly WORD: (sessionId: string) => string;
        readonly MARKDOWN: (sessionId: string) => string;
        readonly BIBTEX: (sessionId: string) => string;
    };
    readonly ADMIN: {
        readonly JOBS: "/api/admin/jobs";
        readonly STATS: "/api/admin/stats";
        readonly USERS: "/api/admin/users";
        readonly LOGS: "/api/admin/logs";
    };
};
export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly JOIN_SESSION: "join_session";
    readonly LEAVE_SESSION: "leave_session";
    readonly RESEARCH_PROGRESS: "research_progress";
    readonly RESEARCH_COMPLETED: "research_completed";
    readonly RESEARCH_FAILED: "research_failed";
    readonly NEW_SOURCES_FOUND: "new_sources_found";
    readonly INSIGHTS_GENERATED: "insights_generated";
    readonly NEW_NOTIFICATION: "new_notification";
    readonly NOTIFICATION_READ: "notification_read";
};
export declare const RESEARCH_CONFIG: {
    readonly MAX_QUERY_LENGTH: 1000;
    readonly MIN_QUERY_LENGTH: 1;
    readonly DEPTH_SETTINGS: {
        readonly quick: {
            readonly maxSources: 10;
            readonly maxSteps: 3;
            readonly estimatedDuration: 30;
        };
        readonly standard: {
            readonly maxSources: 25;
            readonly maxSteps: 5;
            readonly estimatedDuration: 120;
        };
        readonly comprehensive: {
            readonly maxSources: 50;
            readonly maxSteps: 8;
            readonly estimatedDuration: 300;
        };
    };
    readonly SOURCE_LIMITS: {
        readonly academic: 30;
        readonly news: 20;
        readonly web: 25;
        readonly books: 15;
        readonly patents: 10;
        readonly preprints: 20;
    };
    readonly TIMEFRAMES: {
        readonly last_day: {
            readonly days: 1;
        };
        readonly last_week: {
            readonly days: 7;
        };
        readonly last_month: {
            readonly days: 30;
        };
        readonly last_year: {
            readonly days: 365;
        };
        readonly all_time: null;
    };
};
export declare const EXTERNAL_APIS: {
    readonly ARXIV: {
        readonly BASE_URL: "http://export.arxiv.org/api/query";
        readonly MAX_RESULTS: 100;
        readonly RATE_LIMIT: 3;
    };
    readonly PUBMED: {
        readonly BASE_URL: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
        readonly MAX_RESULTS: 200;
        readonly RATE_LIMIT: 10;
    };
    readonly SEMANTIC_SCHOLAR: {
        readonly BASE_URL: "https://api.semanticscholar.org/graph/v1";
        readonly MAX_RESULTS: 100;
        readonly RATE_LIMIT: 100;
    };
    readonly CROSSREF: {
        readonly BASE_URL: "https://api.crossref.org";
        readonly MAX_RESULTS: 1000;
        readonly RATE_LIMIT: 50;
    };
    readonly NEWS_API: {
        readonly BASE_URL: "https://newsapi.org/v2";
        readonly MAX_RESULTS: 100;
        readonly RATE_LIMIT: 1000;
    };
    readonly OPENAI: {
        readonly MODELS: {
            readonly GPT_4: "gpt-4";
            readonly GPT_4_TURBO: "gpt-4-1106-preview";
            readonly GPT_3_5_TURBO: "gpt-3.5-turbo";
        };
        readonly MAX_TOKENS: {
            readonly GPT_4: 8192;
            readonly GPT_4_TURBO: 128000;
            readonly GPT_3_5_TURBO: 4096;
        };
        readonly TEMPERATURE: 0.7;
        readonly TOP_P: 0.9;
    };
};
export declare const JOB_CONFIG: {
    readonly CONCURRENCY: {
        readonly research_query: 2;
        readonly source_fetch: 5;
        readonly content_analysis: 3;
        readonly citation_generation: 2;
        readonly report_generation: 1;
        readonly notification: 10;
    };
    readonly RETRY_ATTEMPTS: {
        readonly research_query: 3;
        readonly source_fetch: 5;
        readonly content_analysis: 3;
        readonly citation_generation: 2;
        readonly report_generation: 2;
        readonly notification: 3;
    };
    readonly RETRY_DELAYS: {
        readonly research_query: 5000;
        readonly source_fetch: 2000;
        readonly content_analysis: 3000;
        readonly citation_generation: 2000;
        readonly report_generation: 5000;
        readonly notification: 1000;
    };
    readonly PRIORITIES: {
        readonly HIGH: 1;
        readonly NORMAL: 5;
        readonly LOW: 10;
    };
};
export declare const APP_CONFIG: {
    readonly NAME: "Deep Research Assistant";
    readonly VERSION: "1.0.0";
    readonly DESCRIPTION: "Autonomous, AI-Powered, Background-Capable Research Platform";
    readonly PAGINATION: {
        readonly DEFAULT_LIMIT: 20;
        readonly MAX_LIMIT: 100;
    };
    readonly FILE_UPLOAD: {
        readonly MAX_SIZE: number;
        readonly ALLOWED_TYPES: readonly ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    };
    readonly RATE_LIMITS: {
        readonly RESEARCH_QUERIES: {
            readonly window: number;
            readonly max: 10;
        };
        readonly API_CALLS: {
            readonly window: number;
            readonly max: 1000;
        };
    };
    readonly SESSION: {
        readonly COOKIE_NAME: "deepresearcher-session";
        readonly MAX_AGE: number;
    };
    readonly CACHE: {
        readonly TTL: {
            readonly RESEARCH_RESULTS: number;
            readonly SOURCE_CONTENT: number;
            readonly API_RESPONSES: number;
        };
    };
};
export declare const CITATION_STYLES: {
    readonly APA: "apa";
    readonly MLA: "mla";
    readonly CHICAGO: "chicago";
    readonly IEEE: "ieee";
};
export declare const SUPPORTED_LANGUAGES: {
    readonly en: "English";
    readonly es: "Spanish";
    readonly fr: "French";
    readonly de: "German";
    readonly it: "Italian";
    readonly pt: "Portuguese";
    readonly ru: "Russian";
    readonly zh: "Chinese";
    readonly ja: "Japanese";
    readonly ko: "Korean";
};
export declare const STATUS_MESSAGES: {
    readonly RESEARCH: {
        readonly PENDING: "Research request received and queued";
        readonly RUNNING: "Research in progress";
        readonly COMPLETED: "Research completed successfully";
        readonly FAILED: "Research failed to complete";
        readonly CANCELLED: "Research was cancelled";
    };
    readonly STEPS: {
        readonly INITIALIZING: "Initializing research session";
        readonly QUERY_ANALYSIS: "Analyzing query and planning research strategy";
        readonly SOURCE_DISCOVERY: "Discovering relevant sources";
        readonly CONTENT_RETRIEVAL: "Retrieving and processing content";
        readonly ANALYSIS: "Analyzing and synthesizing information";
        readonly CITATION_GENERATION: "Generating citations and references";
        readonly INSIGHT_EXTRACTION: "Extracting insights and trends";
        readonly REPORT_GENERATION: "Generating final report";
        readonly FINALIZING: "Finalizing results";
    };
};
export declare const ERROR_CODES: {
    readonly INVALID_QUERY: "INVALID_QUERY";
    readonly INVALID_OPTIONS: "INVALID_OPTIONS";
    readonly MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly INVALID_TOKEN: "INVALID_TOKEN";
    readonly TOKEN_EXPIRED: "TOKEN_EXPIRED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS";
    readonly SESSION_NOT_FOUND: "SESSION_NOT_FOUND";
    readonly USER_NOT_FOUND: "USER_NOT_FOUND";
    readonly RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly QUOTA_EXCEEDED: "QUOTA_EXCEEDED";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly DATABASE_ERROR: "DATABASE_ERROR";
    readonly EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR";
    readonly JOB_EXECUTION_ERROR: "JOB_EXECUTION_ERROR";
    readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    readonly EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR";
    readonly TIMEOUT_ERROR: "TIMEOUT_ERROR";
};
//# sourceMappingURL=index.d.ts.map