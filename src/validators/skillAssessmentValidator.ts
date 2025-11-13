
import { validateRequest } from "../middlewares/validationMiddleware";
export const validateCreateSkillAssessment = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "problem_solving", required: false, type: "number" },
  { field: "speed", required: false, type: "number" },
  { field: "accuracy", required: false, type: "number" },
  { field: "analytical_thinking", required: false, type: "number" },
  { field: "creativity", required: false, type: "number" },
  { field: "assessed_at", required: false, type: "string" },
]);


export const validateUpdateSkillAssessment = validateRequest([
  { field: "problem_solving", required: false, type: "number" },
  { field: "speed", required: false, type: "number" },
  { field: "accuracy", required: false, type: "number" },
  { field: "analytical_thinking", required: false, type: "number" },
  { field: "creativity", required: false, type: "number" },
  { field: "assessed_at", required: false, type: "string" },
]);
