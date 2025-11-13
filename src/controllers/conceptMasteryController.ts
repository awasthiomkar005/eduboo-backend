import { Request, Response } from "express";
import { ConceptMasteryService } from "../services/conceptMasteryService";

export class ConceptMasteryController {
  private service = new ConceptMasteryService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.service.createConceptMastery(req.body);
      res.status(201).json({ success: true, message: "Concept mastery created", data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await this.service.getAll(page, limit);
      res.status(200).json({
        success: true,
        message: "All concept mastery records",
        data: result.items,
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
      const { concept_id } = req.params;
      const data = await this.service.getById(concept_id);
      if (!data) return res.status(404).json({ success: false, message: "Not found" });
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getByUser = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await this.service.getByUser(user_id, page, limit);
      res.status(200).json({
        success: true,
        message: "User concept mastery fetched",
        data: result.items,
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

  update = async (req: Request, res: Response) => {
    try {
      const { concept_id } = req.params;
      const data = await this.service.updateConcept(concept_id, req.body);
      res.status(200).json({ success: true, message: "Updated", data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { concept_id } = req.params;
      await this.service.deleteConcept(concept_id);
      res.status(200).json({ success: true, message: "Concept Mastery Deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
}
