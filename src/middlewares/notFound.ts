import { Request, Response, NextFunction } from "express";

/**
 * 404 Not Found middleware
 * @param {Request} _req - Express request object (unused)
 * @param {Response} _res - Express response object (unused)
 * @param {NextFunction} next - Express next function
 */
export function notFound(_req: Request, _res: Response, next: NextFunction) {
  const err = new Error("Rota não encontrada");
  (err as any).status = 404;
  next(err);
}
