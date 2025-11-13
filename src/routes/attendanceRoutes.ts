import { Router } from "express";
import { AttendanceController } from "../controllers/attendanceController";
import {
  validateCreateAttendance,
  validateUpdateAttendance,
} from "../validators/attendanceValidator";



const router = Router();
const controller = new AttendanceController();

router.post("/create", validateCreateAttendance, controller.create);
router.get("/getAll", controller.getAll);
router.get("/user/:user_id", controller.getByUser);
router.get("/:attendance_id", controller.getById);
router.put("/update/:attendance_id", validateUpdateAttendance, controller.update);
router.delete("/delete/:attendance_id", controller.delete);

export default router;
