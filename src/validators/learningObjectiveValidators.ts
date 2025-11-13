import { validateRequest } from "../middlewares/validationMiddleware";

export const createLearningObjectiveValidator = validateRequest([
  { field: "course_id", required: true, type: "string" },
  { field: "description", required: false, type: "string" },
  { field: "icon_url", required: false, type: "string" },
]);



export const updateLearningObjectiveValidator = validateRequest([
  { field: "description", required: false, type: "string" },
  { field: "icon_url", required: false, type: "string" },
]);