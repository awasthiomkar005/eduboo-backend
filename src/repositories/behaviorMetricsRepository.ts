import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BehaviorMetricsRepository {
  async create(data: any) {
    return await prisma.behaviorMetrics.create({ data });
  }

  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [metrics, total] = await Promise.all([
      prisma.behaviorMetrics.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.behaviorMetrics.count(),
    ]);

    return {
      metrics,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pagesLeft: Math.max(Math.ceil(total / limit) - page, 0),
        totalItemsLeft: total - skip - metrics.length,
      },
    };
  }

  async getById(behavior_id: string) {
    return await prisma.behaviorMetrics.findUnique({ where: { behavior_id } });
  }

  async getByUser(user_id: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [metrics, total] = await Promise.all([
      prisma.behaviorMetrics.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { recorded_at: "desc" },
      }),
      prisma.behaviorMetrics.count({ where: { user_id } }),
    ]);
    return {
      metrics,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pagesLeft: Math.max(Math.ceil(total / limit) - page, 0),
        totalItemsLeft: total - skip - metrics.length,
      },
    };
  }

  async update(behavior_id: string, data: any) {
    return await prisma.behaviorMetrics.update({
      where: { behavior_id },
      data,
    });
  }

  async delete(behavior_id: string) {
    return await prisma.behaviorMetrics.delete({ where: { behavior_id } });
  }
}
