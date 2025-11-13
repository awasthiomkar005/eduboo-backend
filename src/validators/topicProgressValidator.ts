import { validateRequest } from "../middlewares/validationMiddleware";


export const validateCreateTopicProgress = validateRequest([
  { field: "user_id", required: true, type: "string" },
  { field: "course_id", required: true, type: "string" },
  { field: "module_id", required: true, type: "string" },
  { field: "chapter_id", required: false, type: "string" },
  { field: "topic_name", required: true, type: "string" },
  { field: "completion_status", required: false, type: "number" },
  { field: "mastery_level", required: false, type: "string" }, 
  { field: "time_spent", required: false, type: "number" },
  { field: "last_accessed", required: false, type: "string" },
]);


export const validateUpdateTopicProgress = validateRequest([
  { field: "course_id", required: false, type: "string" },
  { field: "module_id", required: false, type: "string" },
  { field: "chapter_id", required: false, type: "string" },
  { field: "topic_name", required: false, type: "string" },
  { field: "completion_status", required: false, type: "number" },
  { field: "mastery_level", required: false, type: "string" },
  { field: "time_spent", required: false, type: "number" },
  { field: "last_accessed", required: false, type: "string" },
]);
