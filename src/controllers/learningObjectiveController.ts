// import { Request, Response } from "express";
// import { LearningObjectiveService } from "../services/learningObjectiveService";

// const learningObjectiveService = new LearningObjectiveService();

// export class LearningObjectiveController {
//   async create(req: Request, res: Response) {
//     try {
//       const data = req.body;
//       const result = await learningObjectiveService.createLearningObjective(data);
//       res.status(201).json({
//         success: true,
//         message: "Learning Objective created successfully",
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message || "Failed to create Learning Objective",
//       });
//     }
//   }

//   async getAll(req: Request, res: Response) {
//     try {
//       const result = await learningObjectiveService.getAllLearningObjectives();
//       res.status(200).json({
//         success: true,
//         message: "Learning Objectives fetched successfully",
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message || "Failed to fetch Learning Objectives",
//       });
//     }
//   }

//   async getByCourseId(req: Request, res: Response) {
//     try {
//       const { course_id } = req.params;
//       const result = await learningObjectiveService.getLearningObjectivesByCourseId(course_id);
//       res.status(200).json({
//         success: true,
//         message: "Learning Objectives fetched successfully for course",
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message || "Failed to fetch Learning Objectives by course_id",
//       });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       await learningObjectiveService.deleteLearningObjective(id);
//       res.status(200).json({
//         success: true,
//         message: "Learning Objective deleted successfully",
//       });
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message || "Failed to delete Learning Objective",
//       });
//     }
//   }
// }
import { Request, Response } from "express";
import { LearningObjectiveService } from "../services/learningObjectiveService";

const service = new LearningObjectiveService();

export class LearningObjectiveController {
  async create(req: Request, res: Response) {
    try {
      const result = await service.createLearningObjective(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await service.getAllLearningObjectives();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getByCourseId(req: Request, res: Response) {
    try {
      const { course_id } = req.params;
      const result = await service.getLearningObjectivesByCourseId(course_id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.updateLearningObjective(id, req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.deleteLearningObjective(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
