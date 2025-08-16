import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ERROR_CODES } from '../constants/index';
import { AuthenticatedRequest } from './auth';

// Custom error classes
export class CustomError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, statusCode: number, code: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 400, ERROR_CODES.INVALID_OPTIONS, details);
  }
}

export class RateLimitError extends CustomError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, ERROR_CODES.RATE_LIMIT_EXCEEDED);
  }
}

export class ExternalAPIError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 502, ERROR_CODES.EXTERNAL_API_ERROR, details);
  }
}

export class ResearchError extends CustomError {
  constructor(message: string, statusCode: number = 500, code: string = ERROR_CODES.INTERNAL_ERROR, details?: any) {
    super(message, statusCode, code, details);
  }
}

// Error logging function
function logError(error: Error, context: any) {
  logger.error('Error occurred', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
  });
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}

export function errorHandler(
  error: Error,
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  // Generate request ID for tracking
  const requestId = req.headers['x-request-id'] as string || 
                   Math.random().toString(36).substring(2, 15);

  // Get user ID if request is authenticated
  const userId = 'user' in req ? req.user?.id : undefined;

  // Log the error
  logError(error, {
    requestId,
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    userId,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  let statusCode = 500;
  let errorCode: string = ERROR_CODES.INTERNAL_ERROR;
  let message = 'An unexpected error occurred';
  let details: any = undefined;

  // Handle specific error types
  if (error instanceof ValidationError) {
    statusCode = 400;
    errorCode = error.code;
    message = error.message;
    details = error.details;
  } else if (error instanceof RateLimitError) {
    statusCode = 429;
    errorCode = error.code;
    message = error.message;
  } else if (error instanceof ExternalAPIError) {
    statusCode = 502;
    errorCode = error.code;
    message = error.message;
    details = error.details;
  } else if (error instanceof ResearchError) {
    statusCode = error.statusCode;
    errorCode = error.code;
    message = error.message;
    details = error.details;
  } else if (error.name === 'ValidationError') {
    // Joi or other validation errors
    statusCode = 400;
    errorCode = ERROR_CODES.INVALID_OPTIONS;
    message = 'Invalid request data';
    details = error.message;
  } else if (error.name === 'UnauthorizedError' || error.message.includes('jwt')) {
    statusCode = 401;
    errorCode = ERROR_CODES.UNAUTHORIZED;
    message = 'Authentication required';
  } else if (error.name === 'CastError' || error.name === 'SyntaxError') {
    statusCode = 400;
    errorCode = ERROR_CODES.INVALID_QUERY;
    message = 'Invalid request format';
  } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
    statusCode = 503;
    errorCode = ERROR_CODES.SERVICE_UNAVAILABLE;
    message = 'External service unavailable';
  }

  // Don't expose internal error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error';
    details = undefined;
  }

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId,
    },
  };

  res.status(statusCode).json(errorResponse);
}

// Async error wrapper
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// 404 handler
export function notFoundHandler(req: Request, res: Response): void {
  const requestId = Math.random().toString(36).substring(2, 15);
  
  logger.warn('Route not found', {
    method: req.method,
    url: req.originalUrl,
    requestId,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: ERROR_CODES.RESOURCE_NOT_FOUND,
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId,
    },
  };

  res.status(404).json(errorResponse);
}

// Validation error helper
export function createValidationError(message: string, details?: any): ValidationError {
  return new ValidationError(message, details);
}

// Rate limit error helper
export function createRateLimitError(message?: string): RateLimitError {
  return new RateLimitError(message);
}

// External API error helper
export function createExternalAPIError(
  message: string, 
  service: string, 
  details?: any
): ExternalAPIError {
  return new ExternalAPIError(`${message} (${service})`, details);
}
