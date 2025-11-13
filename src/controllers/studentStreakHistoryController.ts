import { Request, Response } from "express";
import { StudentStreakHistoryService } from "../services/studentStreakHistoryService";
import { asyncHandler } from '../utils/asyncHandler';

export class StudentStreakHistoryController {
  private service: StudentStreakHistoryService;

  constructor() {
    this.service = new StudentStreakHistoryService();
  }

  createStreakHistory = async (req: Request, res: Response) => {
    try {
      const streak = await this.service.createStreak(req.body);
      res.status(201).json({
        success: true,
        message: "Streak history created successfully",
        data: streak,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getStreaksByProfile = async (req: Request, res: Response) => {
    try {
      const history = await this.service.getHistoryByProfileId(
        req.params.profile_id
      );
      res.status(200).json({ success: true, data: history });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getStreakById = async (req: Request, res: Response) => {
    try {
      const streak = await this.service.getStreakById(req.params.streak_id);
      res.status(200).json({ success: true, data: streak });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };


getAllStreaks = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const result = await this.service.getAllStreaks(page, limit);

    res.status(200).json({
      success: true,
      message: "Student streak history retrieved successfully",
      data: result.streaks,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        pagesLeft: result.pagesLeft,
        totalItemsLeft: result.totalItemsLeft,
      },
    });
  });




  updateStreak = async (req: Request, res: Response) => {
    try {
      const { streak_id } = req.params;
      const { date, exp_earned, is_active } = req.body;

      const updated = await this.service.updateStreak(streak_id, {
        date: date ? new Date(date) : undefined,
        exp_earned,
        is_active,
      });

      res.status(200).json({
        success: true,
        message: "Streak history updated successfully",
        data: updated,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  deleteStreak = async (req: Request, res: Response) => {
    try {
      await this.service.deleteStreak(req.params.streak_id);
      res.status(200).json({
        success: true,
        message: "Streak history deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
