import { Router } from "express";
import { EngagementController } from "../controllers/engagementController";
import {
  validateCreateEngagement,
  validateUpdateEngagement,
} from "../validators/engagementValidator";

const router = Router();
const controller = new EngagementController();


router.post("/create", validateCreateEngagement, controller.createEngagement);
router.get("/getAll", controller.getAllEngagements);
router.get("/:engagement_id", controller.getEngagementById);
router.get("/user/:user_id", controller.getEngagementsByUser);
router.get("/session/:session_id", controller.getEngagementBySession);
router.put("/update/:engagement_id", validateUpdateEngagement, controller.updateEngagement);
router.delete("/delete/:engagement_id", controller.deleteEngagement);

export default router;
