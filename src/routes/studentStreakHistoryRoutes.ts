import express from "express";
import { StudentStreakHistoryController } from "../controllers/studentStreakHistoryController";
import {
  validateCreateStreakHistory,
  validateUpdateStreakHistory,
} from "../validators/studentStreakHistoryValidator";

const router = express.Router();
const controller = new StudentStreakHistoryController();


router.post("/create", validateCreateStreakHistory, controller.createStreakHistory);
router.get("/getAll", controller.getAllStreaks);
router.get("/profile/:profile_id", controller.getStreaksByProfile);
router.get("/:streak_id", controller.getStreakById);
router.put("/update/:streak_id", validateUpdateStreakHistory, controller.updateStreak);
router.delete("/delete/:streak_id", controller.deleteStreak);

export default router;
