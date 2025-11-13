import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';
import { asyncHandler } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseData = req.body;

    const course = await this.courseService.createCourse(courseData);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  });

  getCourses = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const courseType = req.query.type as 'one_to_one' | 'one_to_many' | 'recorded' | undefined;

    const result = await this.courseService.getAllCourses(page, limit, courseType);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Courses retrieved successfully',
      data: result.courses,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  });

  getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await this.courseService.getCourseById(courseId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    });
  });

  updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const courseData = req.body;

    const course = await this.courseService.updateCourse(courseId, courseData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  });

  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const result = await this.courseService.deleteCourse(courseId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  });

  getCoursesByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    const courses = await this.courseService.getCoursesByCategory(categoryId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Courses retrieved successfully',
      data: courses,
    });
  });



  getPurchasedCourses = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.user_id; // set in authMiddleware
    console.log("user id :", userId)
    const courses = await this.courseService.getPurchasedCourses(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Purchased courses retrieved successfully',
      data: courses,
    });
  });

  getModulesWithChapters = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const modules = await this.courseService.getModulesWithChapters(courseId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Modules with chapters retrieved successfully',
      data: modules,
    });
  });

  getTopSellingCourses = asyncHandler(async (req: Request, res: Response) => {
    const { countryName } = req.query;
    console.log("country is :", countryName)
    const limit = Number(req.query.limit) || 5;

    if (!countryName) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Country name is required',
      });
    }

    const courses = await this.courseService.getTopSellingCourses(countryName as string, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Top selling courses retrieved successfully',
      data: courses,
    });
  });

  getLowestSellingCourses = asyncHandler(async (req: Request, res: Response) => {
    const { countryName } = req.query;
    const limit = Number(req.query.limit) || 5;

    if (!countryName) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Country name is required',
      });
    }

    const courses = await this.courseService.getLowestSellingCourses(countryName as string, limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Lowest selling courses retrieved successfully',
      data: courses,
    });
  });

}

// Export controller instance
export const courseController = new CourseController();