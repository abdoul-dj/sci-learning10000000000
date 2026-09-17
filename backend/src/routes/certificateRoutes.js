import { Router } from "express";
import * as certificateController from "../controllers/certificateController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

router.post("/request", authenticate, certificateController.createRequest);
router.get("/my-requests", authenticate, certificateController.getMyRequests);
router.get("/my-certificates", authenticate, certificateController.getMyCertificates);
router.get("/:id", authenticate, certificateController.getCertificate);

router.get("/requests", authenticate, requireAdmin, certificateController.getAllRequests);
router.get("/requests/:id/eligibility", authenticate, requireAdmin, certificateController.checkEligibility);
router.patch("/requests/:id/approve", authenticate, requireAdmin, certificateController.approve);
router.patch("/requests/:id/reject", authenticate, requireAdmin, certificateController.reject);
router.get("/all", authenticate, requireAdmin, certificateController.getAllCertificates);

export default router;
