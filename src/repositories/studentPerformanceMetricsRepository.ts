import { PrismaClient } from "@prisma/client";
import {
  CreatePerformanceRequest,
  UpdatePerformanceRequest,
} from "../dto/request/studentPerformanceMetricsRequest";

const prisma = new PrismaClient();

export class StudentPerformanceRepository {
  async create(data: CreatePerformanceRequest) {
    return await prisma.studentPerformanceMetrics.create({ data });
  }

  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      prisma.studentPerformanceMetrics.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.studentPerformanceMetrics.count(),
    ]);

    return {
      records,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        pagesLeft: Math.max(Math.ceil(total / limit) - page, 0),
        totalItemsLeft: Math.max(total - skip - records.length, 0),
      },
    };
  }

  async getById(metrics_id: string) {
    return await prisma.studentPerformanceMetrics.findUnique({
      where: { metrics_id },
    });
  }

  async getByUser(user_id: string) {
    return await prisma.studentPerformanceMetrics.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
    });
  }

  async update(metrics_id: string, data: UpdatePerformanceRequest) {
    return await prisma.studentPerformanceMetrics.update({
      where: { metrics_id },
      data,
    });
  }

  async delete(metrics_id: string) {
    return await prisma.studentPerformanceMetrics.delete({
      where: { metrics_id },
    });
  }
}
