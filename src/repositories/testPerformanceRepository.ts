import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TestPerformanceRepository {
  async create(data: any) {
    return await prisma.testPerformance.create({ data });
  }


 async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [performances, total] = await Promise.all([
      prisma.testPerformance.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.testPerformance.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - performances.length;
    const pagesLeft = totalPages - page;

    return {
      performances,
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
    const [performances, total] = await Promise.all([
      prisma.testPerformance.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { test_date: "desc" },
      }),
      prisma.testPerformance.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - performances.length;
    const pagesLeft = totalPages - page;

    return {
      performances,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pagesLeft: Math.max(pagesLeft, 0),
        totalItemsLeft: Math.max(totalItemsLeft, 0),
      },
    };
  }

  async getById(test_performance_id: string) {
    return await prisma.testPerformance.findUnique({ where: { test_performance_id } });
  }

  async update(test_performance_id: string, data: any) {
    return await prisma.testPerformance.update({ where: { test_performance_id }, data });
  }

  async delete(test_performance_id: string) {
    return await prisma.testPerformance.delete({ where: { test_performance_id } });
  }
}
