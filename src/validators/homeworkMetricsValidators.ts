import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateHomeworkMetrics = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "week_number", required: false, type: "number" },
  { field: "month", required: false, type: "number" },
  { field: "year", required: true, type: "number" },
  { field: "total_assigned", required: false, type: "number" },
  { field: "total_submitted", required: false, type: "number" },
  { field: "on_time_submissions", required: false, type: "number" },
  { field: "late_submissions", required: false, type: "number" },
  { field: "study_hours", required: false, type: "number" },
]);

export const validateUpdateHomeworkMetrics = validateRequest([
  { field: "week_number", required: false, type: "number" },
  { field: "month", required: false, type: "number" },
  { field: "year", required: false, type: "number" },
  { field: "total_assigned", required: false, type: "number" },
  { field: "total_submitted", required: false, type: "number" },
  { field: "on_time_submissions", required: false, type: "number" },
  { field: "late_submissions", required: false, type: "number" },
  { field: "study_hours", required: false, type: "number" },
]);
