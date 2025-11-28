import { Request, Response } from "express";

export function getStatus(req: Request, res: Response) {
  res.json({ status: "ok" });
}
