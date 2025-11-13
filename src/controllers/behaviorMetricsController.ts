import { Request, Response } from "express";
import { BehaviorMetricsService } from "../services/behaviorMetricsService";
import { CreateBehaviorMetricsRequest, UpdateBehaviorMetricsRequest } from "../dto/request/behaviorMetricsRequest";

const service = new BehaviorMetricsService();

export class BehaviorMetricsController {
  async create(req: Request, res: Response) {
    try {
      const data: CreateBehaviorMetricsRequest = req.body;
      const result = await service.create(data);
      res.status(201).json({ success: true, message: "Behavior metrics created successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await service.getAll(page, limit);
      res.status(200).json({ success: true, message: "Metrics fetched successfully", data: result.metrics, pagination: result.pagination });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { behavior_id } = req.params;
      const result = await service.getById(behavior_id);
      if (!result) return res.status(404).json({ success: false, message: "Not found" });
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await service.getByUser(user_id, page, limit);
      res.status(200).json({ success: true, message: "User metrics fetched successfully", data: result.metrics, pagination: result.pagination });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { behavior_id } = req.params;
      const data: UpdateBehaviorMetricsRequest = req.body;
      const result = await service.update(behavior_id, data);
      res.status(200).json({ success: true, message: "Behavior metrics updated successfully", data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { behavior_id } = req.params;
      await service.delete(behavior_id);
      res.status(200).json({ success: true, message: "Behavior metrics deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
