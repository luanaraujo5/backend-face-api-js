import { Router } from "express";
import { postRegister, getPeopleCtrl, deletePersonCtrl } from "../controllers/people.controller.js";

const router = Router();

router.post("/register", postRegister);
router.get("/people", getPeopleCtrl);
router.delete("/person/:name", deletePersonCtrl);

export default router;
