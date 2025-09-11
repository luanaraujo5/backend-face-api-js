import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const payload: Record<string, unknown> = { ok: false, error: err.message || "Erro interno" };
  if (process.env.NODE_ENV !== "production" && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
}
