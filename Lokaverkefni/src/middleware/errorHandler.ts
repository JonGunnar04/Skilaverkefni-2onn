import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  // Zod validation errors
  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      error: 'Validation error',
      details,
    });
  }

  // Default server error
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong',
  });
};
