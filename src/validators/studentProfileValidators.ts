import { validateRequest } from '../middlewares/validationMiddleware';

export const validateStudentProfileCreation = validateRequest([
  { field: 'user_id', required: true, type: 'string', minLength: 1 },
  { field: 'grade', required: false, type: 'string' },
  { field: 'location', required: false, type: 'string' },
  { field: 'best_subject', required: false, type: 'string' },
]);
