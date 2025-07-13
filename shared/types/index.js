"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAPIError = exports.RateLimitError = exports.ValidationError = exports.ResearchError = exports.NotificationType = exports.ResearchQuerySchema = exports.JobStatus = exports.JobType = exports.SourceType = exports.ResearchStatus = exports.UserRole = void 0;
const zod_1 = require("zod");
// User types
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["RESEARCHER"] = "RESEARCHER";
})(UserRole || (exports.UserRole = UserRole = {}));
var ResearchStatus;
(function (ResearchStatus) {
    ResearchStatus["PENDING"] = "pending";
    ResearchStatus["RUNNING"] = "running";
    ResearchStatus["COMPLETED"] = "completed";
    ResearchStatus["FAILED"] = "failed";
    ResearchStatus["CANCELLED"] = "cancelled";
})(ResearchStatus || (exports.ResearchStatus = ResearchStatus = {}));
var SourceType;
(function (SourceType) {
    SourceType["ACADEMIC"] = "academic";
    SourceType["NEWS"] = "news";
    SourceType["WEB"] = "web";
    SourceType["BOOKS"] = "books";
    SourceType["PATENTS"] = "patents";
    SourceType["PREPRINTS"] = "preprints";
})(SourceType || (exports.SourceType = SourceType = {}));
var JobType;
(function (JobType) {
    JobType["RESEARCH_QUERY"] = "research_query";
    JobType["SOURCE_FETCH"] = "source_fetch";
    JobType["CONTENT_ANALYSIS"] = "content_analysis";
    JobType["CITATION_GENERATION"] = "citation_generation";
    JobType["REPORT_GENERATION"] = "report_generation";
    JobType["NOTIFICATION"] = "notification";
})(JobType || (exports.JobType = JobType = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["WAITING"] = "waiting";
    JobStatus["ACTIVE"] = "active";
    JobStatus["COMPLETED"] = "completed";
    JobStatus["FAILED"] = "failed";
    JobStatus["DELAYED"] = "delayed";
    JobStatus["PAUSED"] = "paused";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
// API Request/Response types
exports.ResearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().min(1).max(1000),
    options: zod_1.z.object({
        depth: zod_1.z.enum(['quick', 'standard', 'comprehensive']).default('standard'),
        sources: zod_1.z.array(zod_1.z.nativeEnum(SourceType)).default([SourceType.ACADEMIC, SourceType.WEB]),
        timeframe: zod_1.z.enum(['last_day', 'last_week', 'last_month', 'last_year', 'all_time']).optional(),
        background: zod_1.z.boolean().default(false),
        language: zod_1.z.string().default('en'),
        maxSources: zod_1.z.number().min(1).max(100).default(20),
        includeImages: zod_1.z.boolean().default(false),
        includeVideos: zod_1.z.boolean().default(false),
        citationStyle: zod_1.z.enum(['apa', 'mla', 'chicago', 'ieee']).default('apa'),
    }).default({}),
});
var NotificationType;
(function (NotificationType) {
    NotificationType["RESEARCH_COMPLETED"] = "research_completed";
    NotificationType["RESEARCH_FAILED"] = "research_failed";
    NotificationType["NEW_INSIGHTS"] = "new_insights";
    NotificationType["SCHEDULED_UPDATE"] = "scheduled_update";
    NotificationType["SYSTEM_MESSAGE"] = "system_message";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
// Error types
class ResearchError extends Error {
    constructor(message, code, statusCode = 500, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'ResearchError';
    }
}
exports.ResearchError = ResearchError;
class ValidationError extends ResearchError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', 400, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class RateLimitError extends ResearchError {
    constructor(message = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_ERROR', 429);
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
class ExternalAPIError extends ResearchError {
    constructor(message, service, details) {
        super(message, 'EXTERNAL_API_ERROR', 502, { service, ...details });
        this.name = 'ExternalAPIError';
    }
}
exports.ExternalAPIError = ExternalAPIError;
//# sourceMappingURL=index.js.map