import { Router } from "express";
import { BehaviorMetricsController } from "../controllers/behaviorMetricsController";
import { validateCreateBehaviorMetrics, validateUpdateBehaviorMetrics } from "../validators/behaviorMetricsValidator";

const router = Router();
const controller = new BehaviorMetricsController();

router.post("/create", validateCreateBehaviorMetrics, controller.create.bind(controller));
router.get("/getAll", controller.getAll.bind(controller));
router.get("/:behavior_id", controller.getById.bind(controller));
router.get("/user/:user_id", controller.getByUser.bind(controller));
router.put("/update/:behavior_id", validateUpdateBehaviorMetrics, controller.update.bind(controller));
router.delete("/delete/:behavior_id", controller.delete.bind(controller));

export default router;
