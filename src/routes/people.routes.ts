import { Router } from "express";
import { postRegister, getPeopleCtrl, deletePersonCtrl } from "../controllers/people.controller.js";

/**
 * Express router for people-related endpoints
 * @swagger
 * tags:
 *   name: People
 *   description: Face recognition people management
 */
const router = Router();

router.post("/register", postRegister);
router.get("/people", getPeopleCtrl);
router.delete("/person/:name", deletePersonCtrl);

export default router;
