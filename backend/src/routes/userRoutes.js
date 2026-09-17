import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/stats", authenticate, requireAdmin, userController.getStats);
router.get("/", authenticate, requireAdmin, userController.getAll);
router.post("/", authenticate, requireAdmin, userController.create);
router.get("/:id", authenticate, requireAdmin, userController.getOne);
router.put("/:id", authenticate, requireAdmin, userController.update);
router.delete("/:id", authenticate, requireAdmin, userController.remove);

export default router;
