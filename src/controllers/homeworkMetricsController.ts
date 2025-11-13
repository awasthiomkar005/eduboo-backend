import { Request, Response } from "express";
import { HomeworkMetricsService } from "../services/homeworkMetricsService";

const service = new HomeworkMetricsService();

export class HomeworkMetricsController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await service.create(data);
      res.status(201).json({ success: true, message: "Homework metrics created", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await service.getAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.getById(id);
      if (!result) return res.status(404).json({ success: false, message: "Record not found" });
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await service.getByUser(user_id, page, limit);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await service.update(id, data);
      res.json({ success: true, message: "Homework metrics updated", data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({ success: true, message: "Homework metrics deleted" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
