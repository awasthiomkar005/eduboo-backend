import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class HomeworkMetricsRepository {
  async create(data: any) {
    return await prisma.homeworkMetrics.create({ data });
  }




async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [metrics, total] = await Promise.all([
      prisma.homeworkMetrics.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.homeworkMetrics.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - metrics.length;
    const pagesLeft = totalPages - page;

    return {
      metrics,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pagesLeft: Math.max(pagesLeft, 0),
        totalItemsLeft: Math.max(totalItemsLeft, 0),
      },
    };
  }

  async getByUser(user_id: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [metrics, total] = await Promise.all([
      prisma.homeworkMetrics.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.homeworkMetrics.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - metrics.length;
    const pagesLeft = totalPages - page;

    return {
      metrics,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pagesLeft: Math.max(pagesLeft, 0),
        totalItemsLeft: Math.max(totalItemsLeft, 0),
      },
    };
  }
  async getById(homework_metrics_id: string) {
    return await prisma.homeworkMetrics.findUnique({ where: { homework_metrics_id } });
  }

 

  async update(homework_metrics_id: string, data: any) {
    return await prisma.homeworkMetrics.update({ where: { homework_metrics_id }, data });
  }

  async delete(homework_metrics_id: string) {
    return await prisma.homeworkMetrics.delete({ where: { homework_metrics_id } });
  }
}
