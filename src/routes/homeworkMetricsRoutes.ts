import { Router } from "express";
import { HomeworkMetricsController } from "../controllers/homeworkMetricsController";
import { validateCreateHomeworkMetrics, validateUpdateHomeworkMetrics } from "../validators/homeworkMetricsValidators";

const router = Router();
const controller = new HomeworkMetricsController();

router.post("/create", validateCreateHomeworkMetrics, controller.create);
router.get("/getAll", controller.getAll);
router.get("/:id", controller.getById);
router.get("/user/:user_id", controller.getByUser);
router.put("/update/:id", validateUpdateHomeworkMetrics, controller.update);
router.delete("/delete/:id", controller.delete);

export default router;
