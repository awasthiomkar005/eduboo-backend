import { Request, Response } from 'express';
import { StudentAssignmentService } from '../services/studentAssignmentService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class StudentAssignmentController {
  private service: StudentAssignmentService;

  constructor() {
    this.service = new StudentAssignmentService();
  }

  getStudentAssignments = asyncHandler(async (req: Request, res: Response) => {
    const studentId = req.params.studentId;
    const status = req.query.status as string | undefined;
    const items = await this.service.getStudentAssignments(studentId, status);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Student assignments retrieved successfully',
      data: items,
    });
  });

  getStudentAssignmentDetail = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, assignmentId } = req.params;
    const detail = await this.service.getStudentAssignmentDetail(studentId, assignmentId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Assignment detail retrieved successfully',
      data: detail,
    });
  });

  submitAssignment = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, assignmentId } = req.params;
    const { submittedData } = req.body;
    const result = await this.service.submitAssignment({ studentId, assignmentId, submittedData });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: result,
    });
  });

  updateAssignmentStatus = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, assignmentId } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Status is required');
    const result = await this.service.updateAssignmentStatus(studentId, assignmentId, status);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Assignment status updated to ${status}`,
      data: result,
    });
  });
}

export default StudentAssignmentController;




