import { Request, Response, NextFunction } from "express";
import { registerPerson, getPeople, removePerson } from "../services/people.service.js";

export function postRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const result = registerPerson(req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export function getPeopleCtrl(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getPeople();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export function deletePersonCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const result = removePerson(name);
    res.json(result);
  } catch (e) {
    next(e);
  }
}
