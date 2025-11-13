import { Router } from 'express';
import StudentAssignmentController from '../controllers/studentAssignmentController';
import { USER_ROLES } from '../utils/constants';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();
const controller = new StudentAssignmentController();

// Public list
router.get('/student/:studentId/assignment', controller.getStudentAssignments);

// Protected below


router.get(
  '/student/:studentId/assignment/:assignmentId',
  authorize([USER_ROLES.Student, USER_ROLES.Teacher, USER_ROLES.Admin]),
  controller.getStudentAssignmentDetail
);
router.use(authenticate);

router.post(
  '/student/:studentId/assignment/:assignmentId/submit',
  authorize([USER_ROLES.Student]),
  controller.submitAssignment
);

router.put(
  '/student/:studentId/assignment/:assignmentId/status',
  authorize([USER_ROLES.Student]),
  controller.updateAssignmentStatus
);

export default router;




