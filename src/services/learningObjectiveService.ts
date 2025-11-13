
import { LearningObjectiveRepository } from "../repositories/learningObjectiveRepository";
import { CreateLearningObjective } from "../dto/request/learningObjectiveRequest";

export class LearningObjectiveService {
  private repo: LearningObjectiveRepository;

  constructor() {
    this.repo = new LearningObjectiveRepository();
  }

  async createLearningObjective(data: CreateLearningObjective) {
    const result = await this.repo.create(data);
    return {
      success: true,
      message: "Learning objective created successfully",
      data: result,
    };
  }

  async getAllLearningObjectives() {
    const result = await this.repo.findAll();
    return { success: true, data: result };
  }

  async getLearningObjectivesByCourseId(course_id: string) {
    const result = await this.repo.findByCourseId(course_id);
    return { success: true, data: result };
  }

  async updateLearningObjective(Learning_objective_id: string, data: Partial<CreateLearningObjective>) {
    const existing = await this.repo.findById(Learning_objective_id);
    if (!existing) {
      throw new Error("Learning objective not found");
    }

    const updated = await this.repo.updateById(Learning_objective_id, data);
    return {
      success: true,
      message: "Learning objective updated successfully",
      data: updated,
    };
  }

  async deleteLearningObjective(Learning_objective_id: string) {
    const existing = await this.repo.findById(Learning_objective_id);
    if (!existing) {
      throw new Error("Learning objective not found");
    }

    await this.repo.deleteById(Learning_objective_id);
    return {
      success: true,
      message: "Learning objective deleted successfully",
    };
  }
}
