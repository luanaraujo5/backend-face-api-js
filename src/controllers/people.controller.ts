import { Request, Response, NextFunction } from "express";
import { registerPerson, getPeople, removePerson } from "../services/people.service.js";

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new person with face descriptors
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - descriptors
 *             properties:
 *               name:
 *                 type: string
 *                 description: Person's name
 *                 example: "João Silva"
 *               descriptors:
 *                 type: array
 *                 description: Array of face descriptor arrays
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *                 example: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]
 *     responses:
 *       200:
 *         description: Person registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid input data
 */
export function postRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const result = registerPerson(req.body);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Get all registered people with their descriptors
 *     tags: [People]
 *     responses:
 *       200:
 *         description: List of people with descriptors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Person's name
 *                     example: "João Silva"
 *                   descriptors:
 *                     type: array
 *                     description: Face descriptor arrays
 *                     items:
 *                       type: array
 *                       items:
 *                         type: number
 *                     example: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]
 */
export function getPeopleCtrl(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getPeople();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

/**
 * @swagger
 * /api/person/{name}:
 *   delete:
 *     summary: Delete a person by name
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Person's name to delete
 *         example: "João Silva"
 *     responses:
 *       200:
 *         description: Person deletion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 removed:
 *                   type: boolean
 *                   description: Whether the person was found and removed
 *                   example: true
 */
export function deletePersonCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const result = removePerson(name);
    res.json(result);
  } catch (e) {
    next(e);
  }
}
