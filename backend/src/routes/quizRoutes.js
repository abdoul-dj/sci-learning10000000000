import { Router } from "express";
import * as quizController from "../controllers/quizController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", quizController.getAll);
router.get("/results/my", authenticate, quizController.getMyResults);
router.get("/results/all", authenticate, requireAdmin, quizController.getAllResults);
router.get("/results/:resultId", authenticate, quizController.getResult);
router.get("/admin/:id", authenticate, requireAdmin, quizController.getOneAdmin);
router.get("/:id", quizController.getOne);
router.post("/", authenticate, requireAdmin, quizController.create);
router.put("/:id", authenticate, requireAdmin, quizController.update);
router.delete("/:id", authenticate, requireAdmin, quizController.remove);
router.post("/:id/submit", authenticate, quizController.submit);

export default router;
