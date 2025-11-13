import { Router } from "express";
import { SkillAssessmentController } from "../controllers/skillAssessmentController";

const router = Router();
const controller = SkillAssessmentController;

router.post("/create", controller.create);
router.get("/getAll",controller.getAll);
router.get("/:skillAssessment_id", controller.getById);
router.get("/user/:user_id", controller.getByUserId);
router.put("/update/:skillAssessment_id", controller.updateSkillAssessment);
router.delete("/delete/:skillAssessment_id", controller.deleteSkillAssessment);

export default router;
