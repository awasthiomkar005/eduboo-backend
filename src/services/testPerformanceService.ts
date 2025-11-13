import { TestPerformanceRepository } from "../repositories/testPerformanceRepository";
import {
  CreateTestPerformanceRequest,
  UpdateTestPerformanceRequest,
} from "../dto/request/testPerformanceRequest";
import { TestPerformanceResponse } from "../dto/response/testPerformanceResponse";

export class TestPerformanceService {
  private repo = new TestPerformanceRepository();

  private mapToResponse(perf: any): TestPerformanceResponse {
    return {
      test_performance_id: perf.test_performance_id,
      user_id: perf.user_id,
      course_id: perf.course_id,
      quiz_attempt_id: perf.quiz_attempt_id ?? null,
      test_name: perf.test_name,
      score: perf.score,
      max_score: perf.max_score,
      percentage: perf.percentage,
      time_taken: perf.time_taken ?? null,
      test_date: perf.test_date.toISOString(),
      created_at: perf.created_at.toISOString(),
    };
  }

  async create(data: CreateTestPerformanceRequest): Promise<TestPerformanceResponse> {
    const perf = await this.repo.create(data);
    return this.mapToResponse(perf);
  }



 async getAll(page: number, limit: number) {
    const { performances, pagination } = await this.repo.getAll(page, limit);
    return {
      data: performances.map((p) => this.mapToResponse(p)),
      pagination,
    };
  }

  async getByUser(user_id: string, page: number, limit: number) {
    const { performances, pagination } = await this.repo.getByUser(
      user_id,
      page,
      limit
    );
    return {
      data: performances.map((p) => this.mapToResponse(p)),
      pagination,
    };
  }

  async getById(id: string): Promise<TestPerformanceResponse | null> {
    const perf = await this.repo.getById(id);
    return perf ? this.mapToResponse(perf) : null;
  }

  async update(id: string, data: UpdateTestPerformanceRequest): Promise<TestPerformanceResponse> {
    const perf = await this.repo.update(id, data);
    return this.mapToResponse(perf);
  }

  async delete(id: string) {
    await this.repo.delete(id);
    return { success: true, message: "Test performance deleted successfully" };
  }
}
