import { Router } from 'express';
import { homeworkController } from '../controllers/homeworkController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { USER_ROLES } from '../utils/constants';

const router = Router();

// Create
router.post('/createhomework',homeworkController.createHomework);
router.get('/getallhomework', homeworkController.getAllHomeworks);
router.get('/course/:course_id', homeworkController.getHomeworksByCourse);
router.get('/chapter/:chapterId', homeworkController.getHomeworksByChapter);
router.get('/creator/:creatorId', homeworkController.getHomeworksByCreator);
router.put('/updatehomework/:homeworkId', homeworkController.updateHomework);
router.delete('/deletehomework/:homeworkId', homeworkController.deleteHomework);
router.get('/:homeworkId', homeworkController.getHomeworkById);

export default router;
