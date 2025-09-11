import { Request, Response, NextFunction } from "express";

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  const err = new Error("Rota não encontrada");
  (err as any).status = 404;
  next(err);
}
