import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateStudentPerformance = validateRequest([
  { field: "profile_id", required: true, type: "string" },
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: false, type: "string" },
  { field: "period_start", required: true, type: "string" },
  { field: "period_end", required: true, type: "string" },
]);

export const validateUpdateStudentPerformance = validateRequest([
  { field: "total_quizzes_attempted", required: false, type: "number" },
  { field: "average_quiz_score", required: false, type: "number" },
  { field: "attendance_rate", required: false, type: "number" },
  { field: "engagement_score", required: false, type: "number" },
  { field: "total_study_hours", required: false, type: "number" },
]);
