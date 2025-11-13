import { ConceptMasteryRepository } from "../repositories/conceptMasteryRepository";
import { SkillStrength } from "@prisma/client";

export class ConceptMasteryService {
  private repo = new ConceptMasteryRepository();

  async createConceptMastery(payload: {
    user_id: string;
    course_id: string;
    skill_name: string;
    score: number;
    strength?: string;
    last_tested?: string;
  }) {
    const strengthEnum = (payload.strength as SkillStrength) || SkillStrength.needs_improvement;
    const lastTested = payload.last_tested ? new Date(payload.last_tested) : new Date();

    return this.repo.create({
      user_id: payload.user_id,
      course_id: payload.course_id,
      skill_name: payload.skill_name,
      score: payload.score,
      strength: strengthEnum,
      last_tested: lastTested,
    });
  }

  async getById(concept_id: string) {
    return this.repo.findById(concept_id);
  }

  async getAll(page = 1, limit = 10) {
    return this.repo.findAll(page, limit);
  }

  async getByUser(user_id: string, page = 1, limit = 10) {
    return this.repo.findByUser(user_id, page, limit);
  }

  async updateConcept(concept_id: string, payload: Partial<{
    skill_name: string;
    score: number;
    strength: string;
    last_tested: string;
  }>) {
    const data: any = { ...payload };
    if (payload.strength) data.strength = payload.strength as SkillStrength;
    if (payload.last_tested) data.last_tested = new Date(payload.last_tested);
    return this.repo.update(concept_id, data);
  }

  async deleteConcept(concept_id: string) {
    return this.repo.delete(concept_id);
  }
}
