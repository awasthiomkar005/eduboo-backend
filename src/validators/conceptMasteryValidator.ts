import { validateRequest } from "../middlewares/validationMiddleware";

export const validateCreateConceptMastery = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "skill_name", required: true, type: "string" },
  { field: "score", required: true, type: "number" },
  { field: "strength", required: false, type: "string" },
  { field: "last_tested", required: false, type: "string" },
]);

export const validateUpdateConceptMastery = validateRequest([
  { field: "skill_name", required: false, type: "string" },
  { field: "score", required: false, type: "number" },
  { field: "strength", required: false, type: "string" },
  { field: "last_tested", required: false, type: "string" },
]);
