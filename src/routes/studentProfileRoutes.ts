import { Router } from 'express';
import { StudentProfileController } from '../controllers/studentProfileController';
import { validateStudentProfileCreation } from '../validators/studentProfileValidators';
import { authenticate, authorize } from '../middlewares/authMiddleware';// if auth needed

const router = Router();
const controller = new StudentProfileController();

// 🔒 Use authentication for sensitive routes if needed
router.post('/create', validateStudentProfileCreation, controller.createStudentProfile);
router.get('/allStudentProfile', controller.getStudentProfiles); // paginated
router.get('/:profile_id', controller.getStudentProfileById);
router.put('/update/:profile_id', authenticate, controller.updateStudentProfile);
router.delete('/delete/:profile_id', authenticate, controller.deleteStudentProfile);

export default router;
