import { Request, Response } from "express";
import { HomeworkService } from "../services/homeworkService";
import { asyncHandler } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../utils/constants";

export class HomeworkController {
  private homeworkService: HomeworkService;

  constructor() {
    this.homeworkService = new HomeworkService();
  }

  createHomework = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const homework = await this.homeworkService.createHomework(data);
    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Homework created successfully",
      data: homework,
    });
  });

  getAllHomeworks = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this.homeworkService.getAllHomeworks(page, limit);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homeworks retrieved successfully",
      data: result.homeworks,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  });

  getHomeworksByCourse = asyncHandler(async (req: Request, res: Response) => {
    const { course_id } = req.params;
    const list = await this.homeworkService.getHomeworksByCourse(course_id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homeworks retrieved successfully",
      data: list,
    });
  });

  getHomeworkById = asyncHandler(async (req: Request, res: Response) => {
    const { homeworkId } = req.params;
    const homework = await this.homeworkService.getHomeworkById(homeworkId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homework retrieved successfully",
      data: homework,
    });
  });

  updateHomework = asyncHandler(async (req: Request, res: Response) => {
    const { homeworkId } = req.params;
    const data = req.body;
    const updated = await this.homeworkService.updateHomework(homeworkId, data);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homework updated successfully",
      data: updated,
    });
  });

  deleteHomework = asyncHandler(async (req: Request, res: Response) => {
    const { homeworkId } = req.params as any;
    const result = await this.homeworkService.deleteHomework(homeworkId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getHomeworksByChapter = asyncHandler(async (req: Request, res: Response) => {
    const { chapterId } = req.params;
    const list = await this.homeworkService.getHomeworksByChapter(chapterId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homeworks retrieved successfully",
      data: list,
    });
  });

  getHomeworksByCreator = asyncHandler(async (req: Request, res: Response) => {
    const { creatorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await this.homeworkService.getHomeworksByCreator(creatorId, page, limit);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Homeworks retrieved successfully",
      data: result,
    });
  });
}

export const homeworkController = new HomeworkController();
