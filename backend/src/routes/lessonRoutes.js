import { Router } from "express";
import * as lessonController from "../controllers/lessonController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/categories", lessonController.getCategories);
router.get("/", lessonController.getAll);
router.get("/:id", lessonController.getOne);
router.post("/", authenticate, requireAdmin, lessonController.create);
router.put("/:id", authenticate, requireAdmin, lessonController.update);
router.delete("/:id", authenticate, requireAdmin, lessonController.remove);

export default router;
