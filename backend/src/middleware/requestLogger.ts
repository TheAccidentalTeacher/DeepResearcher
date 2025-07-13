import { Request, Response, NextFunction } from 'express';
import { logRequest } from '../utils/logger';

export interface RequestWithTiming extends Request {
  startTime?: number;
}

export function requestLogger(
  req: RequestWithTiming,
  res: Response,
  next: NextFunction
): void {
  req.startTime = Date.now();

  // Capture the original end function
  const originalEnd = res.end;

  // Override res.end to log the request when response is sent
  res.end = function (chunk?: any, encoding?: any): Response {
    const responseTime = Date.now() - (req.startTime || Date.now());
    
    // Log the request
    logRequest(req, res, responseTime);

    // Call the original end function
    originalEnd.call(this, chunk, encoding);
    return this;
  };

  next();
}
