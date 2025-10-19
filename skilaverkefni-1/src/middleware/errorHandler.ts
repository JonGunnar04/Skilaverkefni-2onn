import type { Request, Response, NextFunction } from 'express';
import z from 'zod';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation Errors
  if (err instanceof z.ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return res.status(400).json({
      err: 'Validation failed.',
      details,
    });
  }

  // Normal errors
  res.status(500).json({
    success: false,
    err: 'Server error',
  });
};
