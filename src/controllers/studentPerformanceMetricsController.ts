import { Request, Response } from "express";
import { StudentPerformanceService } from "../services/studentPerformanceMetricsService";

export class StudentPerformanceController {
  private service = new StudentPerformanceService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ success: true, message: "Performance record created", data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.service.getAll(page, limit);
      res.status(200).json({ success: true, message: "Records fetched", ...result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getById(req.params.metrics_id);
      res.status(200).json({ success: true, message: "Record fetched", data });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getByUser(req.params.user_id);
      res.status(200).json({ success: true, message: "User records fetched", data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.service.update(req.params.metrics_id, req.body);
      res.status(200).json({ success: true, message: "Record updated", data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(req.params.metrics_id);
      res.status(200).json({ success: true, message: "Record deleted" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
