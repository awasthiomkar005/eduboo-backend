import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateBehaviorMetrics = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "session_id", required: false, type: "string" },
  { field: "focus_score", required: false, type: "number" },
  { field: "collaboration_score", required: false, type: "number" },
  { field: "time_management_score", required: false, type: "number" },
  { field: "notes", required: false, type: "string" },
  { field: "recorded_at", required: false, type: "string" },
]);

export const validateUpdateBehaviorMetrics = validateRequest([
  { field: "focus_score", required: false, type: "number" },
  { field: "collaboration_score", required: false, type: "number" },
  { field: "time_management_score", required: false, type: "number" },
  { field: "notes", required: false, type: "string" },
  { field: "recorded_at", required: false, type: "string" },
]);
