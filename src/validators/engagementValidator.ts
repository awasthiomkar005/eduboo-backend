import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateEngagement = validateRequest([
  { field: "session_id", required: true, type: "string" },
  { field: "user_id", required: true, type: "string" },
  { field: "participation_level", required: false, type: "number" },
  { field: "interaction_score", required: false, type: "number" },
  { field: "questions_asked", required: false, type: "number" },
  { field: "questions_answered", required: false, type: "number" },
  { field: "time_on_task", required: false, type: "number" },
]);

export const validateUpdateEngagement = validateRequest([
  { field: "participation_level", required: false, type: "number" },
  { field: "interaction_score", required: false, type: "number" },
  { field: "questions_asked", required: false, type: "number" },
  { field: "questions_answered", required: false, type: "number" },
  { field: "time_on_task", required: false, type: "number" },
]);
