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

    // One validation issue
    if (details.length === 1) {
      return res.status(400).json({
        error: details[0].message,
      });
    }

    // Multiple issues
    return res.status(400).json({
      error: 'Validation failed',
      details,
    });
  }

  // Default server error
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong',
  });
};
