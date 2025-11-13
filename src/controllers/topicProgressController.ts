import { Request, Response } from "express";
import { TopicProgressService } from "../services/topicProgressService";

export class TopicProgressController {
  private service: TopicProgressService;

  constructor() {
    this.service = new TopicProgressService();
  }

  createProgress = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const created = await this.service.createProgress(data);
      res.status(201).json({ success: true, message: "Topic progress created", data: created });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  getAllProgress = async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const result = await this.service.getAll(page, limit);
      res.status(200).json({
        success: true,
        message: "Topic progress fetched",
        data: result.progress,
        pagination: {
          totalItems: result.total,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
          pagesLeft: result.pagesLeft,
          totalItemsLeft: result.totalItemsLeft,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { progress_id } = req.params;
      const progress = await this.service.getById(progress_id);
      if (!progress) return res.status(404).json({ success: false, message: "Not found" });
      res.status(200).json({ success: true, data: progress });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const result = await this.service.getByUser(user_id, page, limit);
      res.status(200).json({
        success: true,
        message: "User topic progress fetched",
        data: result.progress,
        pagination: {
          totalItems: result.total,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
          pagesLeft: result.pagesLeft,
          totalItemsLeft: result.totalItemsLeft,
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  updateProgress = async (req: Request, res: Response) => {
    try {
      const { progress_id } = req.params;
      const data = req.body;
      const updated = await this.service.updateProgress(progress_id, data);
      res.status(200).json({ success: true, message: "Topic progress updated", data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  deleteProgress = async (req: Request, res: Response) => {
    try {
      const { progress_id } = req.params;
      await this.service.deleteProgress(progress_id);
      res.status(200).json({ success: true, message: "Topic progress deleted" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
