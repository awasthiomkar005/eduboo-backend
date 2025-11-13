import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateAttendance = validateRequest([
  { field: "session_id", required: true, type: "string" },
  { field: "user_id", required: true, type: "string" },
  { field: "status", required: true, type: "string" }, // e.g. "PRESENT", "ABSENT", etc.
  { field: "arrival_time", required: false, type: "string" },
  { field: "leave_time", required: false, type: "string" },
  { field: "notes", required: false, type: "string" },
  { field: "profile_id", required: true, type: "string" },
]);

export const validateUpdateAttendance = validateRequest([
  { field: "status", required: false, type: "string" },
  { field: "arrival_time", required: false, type: "string" },
  { field: "leave_time", required: false, type: "string" },
  { field: "notes", required: false, type: "string" },
]);
