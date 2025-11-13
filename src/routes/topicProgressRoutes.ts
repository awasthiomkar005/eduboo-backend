import { Router, Request, Response } from "express";
import { TopicProgressController } from "../controllers/topicProgressController";
import {
  validateCreateTopicProgress,
  validateUpdateTopicProgress,
} from "../validators/topicProgressValidator";

const router = Router();
const controller = new TopicProgressController();

router.post("/create", validateCreateTopicProgress, controller.createProgress);
router.get("/getAll", controller.getAllProgress);
router.get("/:progress_id", controller.getById);
router.get("/user/:user_id", controller.getByUser);
router.put("/update/:progress_id", validateUpdateTopicProgress, controller.updateProgress);
router.delete("/delete/:progress_id", controller.deleteProgress);

export default router;
