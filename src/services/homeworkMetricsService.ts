import { HomeworkMetricsRepository } from "../repositories/homeworkMetricsRepository";

const repo = new HomeworkMetricsRepository();

export class HomeworkMetricsService {
  async create(data: any) {
    return await repo.create(data);
  }



    async getAll(page: number = 1, limit: number = 10) {
    return await repo.getAll(page, limit);
  }
  
  async getById(id: string) {
    return await repo.getById(id);
  }

async getByUser(userId: string, page: number = 1, limit: number = 10) {
    return await repo.getByUser(userId, page, limit);
  }

  async update(id: string, data: any) {
    return await repo.update(id, data);
  }

  async delete(id: string) {
    return await repo.delete(id);
  }
}
