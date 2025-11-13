import { EngagementRepository } from "../repositories/engagementRepository";
import { CreateEngagementRequest, UpdateEngagementRequest } from "../dto/request/engagementRequest";

export class EngagementService {
  private repo = new EngagementRepository();

  async create(data: CreateEngagementRequest) {
    return this.repo.create(data);
  }

  async getAll(page: number, limit: number) {
    return this.repo.getAll(page, limit);
  }

  async getByUser(user_id: string, page: number, limit: number) {
    return this.repo.getByUser(user_id, page, limit);
  }

  async getBySession(session_id: string) {
    return this.repo.getBySession(session_id);
  }

  async getById(engagement_id: string) {
    return this.repo.getById(engagement_id);
  }

  async update(engagement_id: string, data: UpdateEngagementRequest) {
    return this.repo.update(engagement_id, data);
  }

  async delete(engagement_id: string) {
    return this.repo.delete(engagement_id);
  }
}
