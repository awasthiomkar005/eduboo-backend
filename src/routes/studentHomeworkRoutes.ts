import { Router } from 'express';
import { StudentHomeworkController } from '../controllers/studentHomeworkController';
import { USER_ROLES } from '../utils/constants';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
const studentHomeworkController = new StudentHomeworkController();

// Student routes
// Public: list student homeworks (no authentication)
router.get('/student/:studentId/homework', 
  studentHomeworkController.getStudentHomeworks
);

// Apply auth middleware to routes below

router.get('/student/:studentId/homework/:homeworkId',
  studentHomeworkController.getStudentHomeworkDetail
);

router.use(authenticate);

router.post('/student/:studentId/homework/:homeworkId/submit', 
  authorize([USER_ROLES.Student]),
  studentHomeworkController.submitHomework
);

router.put('/student/:studentId/homework/:homeworkId/status', 
  authorize([USER_ROLES.Student]),
  studentHomeworkController.updateHomeworkStatus
);

// Teacher routes
// router.put('/homework/submission/:studentHomeworkId/grade', 
//   authorize([USER_ROLES.Teacher]),
//   studentHomeworkController.gradeHomework
// );

router.get('/homework/:homeworkId/submissions', 
  authorize([USER_ROLES.Teacher, USER_ROLES.Admin]),
  studentHomeworkController.getHomeworkSubmissions
);

// Admin/System route (can be called via cron job)
router.get('/homework/check-overdue', 
  authorize([USER_ROLES.Admin]),
  studentHomeworkController.checkOverdueHomeworks
);

export default router;
