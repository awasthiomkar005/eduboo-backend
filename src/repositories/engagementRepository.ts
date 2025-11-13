import { PrismaClient } from "@prisma/client";
import { CreateEngagementRequest, UpdateEngagementRequest } from "../dto/request/engagementRequest";

const prisma = new PrismaClient();

export class EngagementRepository {
  async create(data: CreateEngagementRequest) {
    return await prisma.engagementMetrics.create({ data });
  }

  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      prisma.engagementMetrics.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.engagementMetrics.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - records.length;
    const pagesLeft = totalPages - page;

    return {
      records,
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

    const [records, total] = await Promise.all([
      prisma.engagementMetrics.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.engagementMetrics.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const totalItemsLeft = total - skip - records.length;
    const pagesLeft = totalPages - page;

    return {
      records,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        pagesLeft: Math.max(pagesLeft, 0),
        totalItemsLeft: Math.max(totalItemsLeft, 0),
      },
    };
  }

  async getBySession(session_id: string) {
    return await prisma.engagementMetrics.findUnique({
      where: { session_id },
    });
  }

  async getById(engagement_id: string) {
    return await prisma.engagementMetrics.findUnique({
      where: { engagement_id },
    });
  }

  async update(engagement_id: string, data: UpdateEngagementRequest) {
    return await prisma.engagementMetrics.update({
      where: { engagement_id },
      data,
    });
  }

  async delete(engagement_id: string) {
    return await prisma.engagementMetrics.delete({
      where: { engagement_id },
    });
  }
}
