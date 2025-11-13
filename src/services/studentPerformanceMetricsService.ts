import { StudentPerformanceRepository } from "../repositories/studentPerformanceMetricsRepository";
import {
  CreatePerformanceRequest,
  UpdatePerformanceRequest,
} from "../dto/request/studentPerformanceMetricsRequest";

export class StudentPerformanceService {
  private repo = new StudentPerformanceRepository();

  async create(data: CreatePerformanceRequest) {
    return this.repo.create(data);
  }

  async getAll(page: number, limit: number) {
    return this.repo.getAll(page, limit);
  }

  async getById(metrics_id: string) {
    return this.repo.getById(metrics_id);
  }

  async getByUser(user_id: string) {
    return this.repo.getByUser(user_id);
  }

  async update(metrics_id: string, data: UpdatePerformanceRequest) {
    return this.repo.update(metrics_id, data);
  }

  async delete(metrics_id: string) {
    return this.repo.delete(metrics_id);
  }
}
