

import { Request, Response } from "express";
import { SkillAssessmentService } from "../services/skillAssessmentService";

const service = new SkillAssessmentService();

export class SkillAssessmentController {
  static async create(req: Request, res: Response) {
    try {
      const data = await service.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await service.getAll(page, limit);
      res.json({ success: true, ...data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

 static async getById(req: Request, res: Response) {
  try {
    const data = await service.getById(req.params.skillAssessment_id); 
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
}


  static async getByUserId(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await service.getByUserId(user_id, page, limit);
      res.json({ success: true, ...data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async updateSkillAssessment(req: Request, res: Response) {
  try {
    const { skillAssessment_id } = req.params;  
    const data = await service.update(skillAssessment_id, req.body);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}


  static async deleteSkillAssessment(req: Request, res: Response) {
  try {
    const { skillAssessment_id } = req.params; 
    await service.deleteSkillAssessment(skillAssessment_id);
    res.json({ success: true, message: "SkillAssessment deleted successfully" });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
}


}
