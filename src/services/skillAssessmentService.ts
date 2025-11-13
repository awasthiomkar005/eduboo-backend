

import { SkillAssessmentRepository } from "../repositories/skillAssessmentRepository";
import {
  CreateSkillAssessmentRequest,
  UpdateSkillAssessmentRequest,
} from "../dto/request/skillAssessmentRequest";

export class SkillAssessmentService {
  private repo: SkillAssessmentRepository;

  constructor() {
    this.repo = new SkillAssessmentRepository();
  }

  async create(data: CreateSkillAssessmentRequest) {
    return this.repo.create(data);
  }

  async getAll(page: number = 1, limit: number = 10) {
    return this.repo.findAll(page, limit);
  }

  async getById(assessment_id: string) {
    const record = await this.repo.getById(assessment_id);
    if (!record) throw new Error("SkillAssessment not found");
    return record;
  }

  async getByUserId(user_id: string, page: number = 1, limit: number = 10) {
    return this.repo.findByUserId(user_id, page, limit);
  }

  async update(assessment_id: string, data: UpdateSkillAssessmentRequest) {
    await this.getById(assessment_id);
    return this.repo.update(assessment_id, data);
  }

  async deleteSkillAssessment(assessment_id: string) {
  await this.getById(assessment_id);
  return this.repo.delete(assessment_id);
}

}

