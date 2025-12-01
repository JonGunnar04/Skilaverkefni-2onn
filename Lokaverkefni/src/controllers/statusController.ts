import { Request, Response, NextFunction } from 'express';
import db from '../config/db';

export function getStatus(req: Request, res: Response) {
  res.json({ status: 'ok' });
}

export async function getDbStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await db.one<{ value: number }>('SELECT 1 as value');
    res.json({
      status: 'ok',
      database: result.value === 1 ? 'connected' : 'unknown',
    });
  } catch (err) {
    next(err);
  }
}
