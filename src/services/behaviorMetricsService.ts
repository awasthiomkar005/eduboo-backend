import { BehaviorMetricsRepository } from "../repositories/behaviorMetricsRepository";
import { PrismaClient } from "@prisma/client";

const repo = new BehaviorMetricsRepository();
const prisma = new PrismaClient();

export class BehaviorMetricsService {
  async create(data: any) {
    // ✅ Validate foreign keys exist
    const user = await prisma.user.findUnique({ where: { user_id: data.user_id } });
    const course = await prisma.course.findUnique({ where: { course_id: data.course_id } });

    if (!user) throw new Error("Invalid user_id");
    if (!course) throw new Error("Invalid course_id");

    if (data.session_id) {
      const session = await prisma.session.findUnique({ where: { session_id: data.session_id } });
      if (!session) throw new Error("Invalid session_id");
    }

    return await repo.create(data);
  }

  async getAll(page = 1, limit = 10) {
    return await repo.getAll(page, limit);
  }

  async getById(id: string) {
    return await repo.getById(id);
  }

  async getByUser(userId: string, page = 1, limit = 10) {
    return await repo.getByUser(userId, page, limit);
  }

  async update(id: string, data: any) {
    return await repo.update(id, data);
  }

  async delete(id: string) {
    return await repo.delete(id);
  }
}
