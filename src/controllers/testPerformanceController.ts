import { Request, Response } from "express";
import { TestPerformanceService } from "../services/testPerformanceService";
import {
  CreateTestPerformanceRequest,
  UpdateTestPerformanceRequest,
} from "../dto/request/testPerformanceRequest";

export class TestPerformanceController {
  private service = new TestPerformanceService();

  create = async (req: Request, res: Response) => {
    try {
      const data: CreateTestPerformanceRequest = req.body;
      const performance = await this.service.create(data);
      res.status(201).json({ success: true, message: "Test performance created", data: performance });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.service.getAll(page, limit);
      res.status(200).json({ success: true, message: "Fetched successfully", data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const performance = await this.service.getById(id);
      if (!performance) return res.status(404).json({ success: false, message: "Not found" });
      res.status(200).json({ success: true, data: performance });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



getByUser = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.service.getByUser(user_id, page, limit);
      res.status(200).json({ success: true, message: "Fetched user test performances", data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };






  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: UpdateTestPerformanceRequest = req.body;
      const performance = await this.service.update(id, data);
      res.status(200).json({ success: true, message: "Updated successfully", data: performance });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
