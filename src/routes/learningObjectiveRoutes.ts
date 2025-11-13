import { Router } from "express";
import { LearningObjectiveController } from "../controllers/learningObjectiveController";
import { createLearningObjectiveValidator,updateLearningObjectiveValidator } from "../validators/learningObjectiveValidators";

const router = Router();
const controller = new LearningObjectiveController();

router.post("/create", createLearningObjectiveValidator, controller.create.bind(controller));
router.get("/getAll", controller.getAll.bind(controller));
router.get("/:course_id", controller.getByCourseId.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.put("/update/:id", updateLearningObjectiveValidator, controller.update);

export default router;
