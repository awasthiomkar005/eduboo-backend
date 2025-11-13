import { Request, Response } from "express";
import { EngagementService } from "../services/engagementService";
import { asyncHandler } from "../utils/asyncHandler";

export class EngagementController {
  private service: EngagementService;

  constructor() {
    this.service = new EngagementService();
  }

  
  createEngagement = asyncHandler(async (req: Request, res: Response) => {
    const engagement = await this.service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Engagement record created successfully",
      data: engagement,
    });
  });

  
  getAllEngagements = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const result = await this.service.getAll(page, limit);

    res.status(200).json({
      success: true,
      message: "Engagement records retrieved successfully",
      data: result.records,
      pagination: result.pagination,
    });
  });


  getEngagementById = asyncHandler(async (req: Request, res: Response) => {
    const engagement = await this.service.getById(req.params.engagement_id);

    res.status(200).json({
      success: true,
      message: "Engagement record retrieved successfully",
      data: engagement,
    });
  });

 
  getEngagementsByUser = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const result = await this.service.getByUser(user_id, page, limit);

    res.status(200).json({
      success: true,
      message: "Engagement records for user retrieved successfully",
      data: result.records,
      pagination: result.pagination,
    });
  });


  getEngagementBySession = asyncHandler(async (req: Request, res: Response) => {
    const engagement = await this.service.getBySession(req.params.session_id);

    res.status(200).json({
      success: true,
      message: "Engagement record for session retrieved successfully",
      data: engagement,
    });
  });

  
  updateEngagement = asyncHandler(async (req: Request, res: Response) => {
    const { engagement_id } = req.params;
    const updated = await this.service.update(engagement_id, req.body);

    res.status(200).json({
      success: true,
      message: "Engagement record updated successfully",
      data: updated,
    });
  });

 
  deleteEngagement = asyncHandler(async (req: Request, res: Response) => {
    const { engagement_id } = req.params;
    await this.service.delete(engagement_id);

    res.status(200).json({
      success: true,
      message: "Engagement record deleted successfully",
    });
  });
}
