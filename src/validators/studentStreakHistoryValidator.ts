
import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateStreakHistory = validateRequest([
  { field: "profile_id", required: true, type: "string" },
  { field: "date", required: true, type: "string" },
  { field: "exp_earned", required: false, type: "number" },
  { field: "is_active", required: false, type: "boolean" },
]);

export const validateUpdateStreakHistory = validateRequest([
  { field: "date", required: false, type: "string" },
  { field: "exp_earned", required: false, type: "number" },
  { field: "is_active", required: false, type: "boolean" },
]);
