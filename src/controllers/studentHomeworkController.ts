import { Request, Response } from "express";
import { StudentHomeworkService } from "../services/studentHomeworkService";
import { asyncHandler } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../utils/constants";

export class StudentHomeworkController {
  private studentHomeworkService: StudentHomeworkService;

  constructor() {
    this.studentHomeworkService = new StudentHomeworkService();
  }

  // Get all homeworks for a student
  getStudentHomeworks = asyncHandler(async (req: Request, res: Response) => {
    const studentId = req.params.studentId;
    const status = req.query.status as string | undefined;
    
    const homeworks = await this.studentHomeworkService.getStudentHomework(studentId, status);
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Student homeworks retrieved successfully",
      data: homeworks,
    });
  });

  // Get homework detail for a student
  getStudentHomeworkDetail = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, homeworkId } = req.params;
    
    const homeworkDetail = await this.studentHomeworkService.getStudentHomeworkDetail(
      studentId,
      homeworkId
    );
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homework detail retrieved successfully",
      data: homeworkDetail,
    });
  });

  // Submit homework
  submitHomework = asyncHandler(async (req: Request, res: Response) => {
    const studentId = req.params.studentId;
    const { homeworkId } = req.params;
    const { submittedData } = req.body;
    
    const result = await this.studentHomeworkService.submitHomework({
      studentId,
      homeworkId,
      submittedData,
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homework submitted successfully",
      data: result,
    });
  });

  // Update homework status (e.g., IN_PROGRESS)
  updateHomeworkStatus = asyncHandler(async (req: Request, res: Response) => {
    const { studentId, homeworkId } = req.params;
    const { status } = req.body;
    
    if (!status) {
      throw new Error("Status is required");
    }
    
    const result = await this.studentHomeworkService.updateHomeworkStatus(
      studentId,
      homeworkId,
      status
    );
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Homework status updated to ${status}`,
      data: result,
    });
  });

  // Grade homework (for teachers)
  // gradeHomework = asyncHandler(async (req: Request, res: Response) => {
  //   const { studentHomeworkId } = req.params;
  //   const { score, feedback } = req.body;
  //   const gradedById = (req as any).user?.user_id; // Assuming user is authenticated and user_id is available
    
  //   if (typeof score === 'undefined' || !feedback) {
  //     throw new Error("Score and feedback are required");
  //   }
    
  //   // const result = await this.studentHomeworkService.gradeHomework({
  //   //   studentHomeworkId,
  //   //   score: Number(score),
  //   //   feedback,
  //   //   gradedById,
  //   // });
    
  // //   res.status(HTTP_STATUS.OK).json({
  // //     success: true,
  // //     message: "Homework graded successfully",
  // //     data: result,
  // //   });
  // // });

  // Get all submissions for a homework (for teachers)
  getHomeworkSubmissions = asyncHandler(async (req: Request, res: Response) => {
    const { homeworkId } = req.params;
    const status = req.query.status as string | undefined;
    
    const submissions = await this.studentHomeworkService.getHomeworkSubmissions(
      homeworkId,
      status
    );
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homework submissions retrieved successfully",
      data: submissions,
    });
  });

  // Check for overdue homeworks (can be run as a cron job)
  checkOverdueHomeworks = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.studentHomeworkService.getOverdueHomeworks();
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Overdue homebooks checked successfully",
      data: {
        count: result.length,
        homeworks: result,
      },
    });
  });
}
