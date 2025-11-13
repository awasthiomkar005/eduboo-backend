import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';
import { validateGetSessionsByTeacher, validateGetUpcomingClasses } from '../validators/sessionValidator';
import { authenticate } from '../middlewares/authMiddleware';

// import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// public or protected depending on your auth rules
router.get('/:teacherId/sessions', validateGetSessionsByTeacher, sessionController.getSessionsByTeacher);

// Get upcoming classes for a student
router.get('/student/:studentId/upcoming', authenticate, validateGetUpcomingClasses, sessionController.getUpcomingClassesByStudent);

export default router; 
