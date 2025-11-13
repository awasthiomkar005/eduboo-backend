import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateTestPerformance = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "quiz_attempt_id", required: false, type: "string" },
  { field: "test_name", required: true, type: "string" },
  { field: "score", required: true, type: "number" },
  { field: "max_score", required: true, type: "number" },
  { field: "percentage", required: true, type: "number" },
  { field: "time_taken", required: false, type: "number" },
  { field: "test_date", required: true, type: "string" },
]);

export const validateUpdateTestPerformance = validateRequest([
  { field: "quiz_attempt_id", required: false, type: "string" },
  { field: "test_name", required: false, type: "string" },
  { field: "score", required: false, type: "number" },
  { field: "max_score", required: false, type: "number" },
  { field: "percentage", required: false, type: "number" },
  { field: "time_taken", required: false, type: "number" },
  { field: "test_date", required: false, type: "string" },
]);
