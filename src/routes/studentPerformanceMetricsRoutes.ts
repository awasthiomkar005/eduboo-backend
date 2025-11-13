import { Router } from "express";
import { StudentPerformanceController } from "../controllers/studentPerformanceMetricsController";
import {
  validateCreateStudentPerformance,
  validateUpdateStudentPerformance,
} from "../validators/studentPerformanceMetricsValidator";

const router = Router();
const controller = new StudentPerformanceController();

router.post("/create", validateCreateStudentPerformance, controller.create);
router.get("/getAll", controller.getAll);
router.get("/user/:user_id", controller.getByUser);
router.get("/:metrics_id", controller.getById);
router.put("/update/:metrics_id", validateUpdateStudentPerformance, controller.update);
router.delete("/delete/:metrics_id", controller.delete);

export default router;
