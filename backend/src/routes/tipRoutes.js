import { Router } from "express";
import * as tipController from "../controllers/tipController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.get("/", tipController.getAll);
router.get("/:id", tipController.getOne);
router.post("/", authenticate, requireAdmin, tipController.create);
router.put("/:id", authenticate, requireAdmin, tipController.update);
router.delete("/:id", authenticate, requireAdmin, tipController.remove);

export default router;
