import { validateRequest } from '../middlewares/validationMiddleware';

export const validateHomeworkCreation = validateRequest([
  { field: 'course_id', required: true, type: 'string', minLength: 1 },
  { field: 'chapter_id', required: true, type: 'string', minLength: 1 },
  { field: 'title', required: true, type: 'string', minLength: 2, maxLength: 200 },
  { field: 'description', required: false, type: 'string', maxLength: 1000 },
  { field: 'type', required: true, type: 'string', custom: (value: string) => {
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      return validTypes.includes(value) || 'Type must be QUIZ, PUZZLE, or CODE_EXERCISE';
    } },
  { field: 'language', required: false, type: 'string', minLength: 2, maxLength: 50 },
  { field: 'starter_code', required: false, type: 'string', maxLength: 10000 },
  { field: 'metadata', required: false, type: 'object' },
  { field: 'reward_points', required: false, type: 'number', custom: (v: number) => v >= 0 || 'Reward points must be 0 or greater' },
  { field: 'created_by', required: true, type: 'string', minLength: 1 },
]);

export const validateHomeworkUpdate = validateRequest([
  { field: 'title', required: false, type: 'string', minLength: 2, maxLength: 200 },
  { field: 'description', required: false, type: 'string', maxLength: 1000 },
  { field: 'type', required: false, type: 'string', custom: (value: string) => {
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      return validTypes.includes(value) || 'Type must be QUIZ, PUZZLE, or CODE_EXERCISE';
    } },
  { field: 'language', required: false, type: 'string', minLength: 2, maxLength: 50 },
  { field: 'starter_code', required: false, type: 'string', maxLength: 10000 },
  { field: 'metadata', required: false, type: 'object' },
  { field: 'reward_points', required: false, type: 'number', custom: (v: number) => v >= 0 || 'Reward points must be 0 or greater' },
]);

export const validateHomeworkId = validateRequest([
  { field: 'homeworkId', required: true, type: 'string', minLength: 1, custom: (value: string) => /^[a-zA-Z0-9\-_]+$/.test(value) || 'Homework ID must be alphanumeric' },
]);
