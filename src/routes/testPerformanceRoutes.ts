import { Router } from "express";
import { TestPerformanceController } from "../controllers/testPerformanceController";
import {
  validateCreateTestPerformance,
  validateUpdateTestPerformance,
} from "../validators/testPerformanceValidator";
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const controller = new TestPerformanceController();

router.post("/create",validateCreateTestPerformance, controller.create);
router.get("/getAll", controller.getAll);
router.get("/:id", controller.getById);
router.get("/user/:user_id", controller.getByUser);
router.put("/update/:id", validateUpdateTestPerformance, controller.update);
router.delete("/delete/:id", controller.delete);

export default router;
