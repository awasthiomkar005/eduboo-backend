import { PrismaClient } from "@prisma/client";
import { CreateAttendanceRequest, UpdateAttendanceRequest } from "../dto/request/attendanceRequest";

const prisma = new PrismaClient();

export class AttendanceRepository {
  async create(data: CreateAttendanceRequest) {
    return await prisma.attendanceRecord.create({ data });
  }

  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      prisma.attendanceRecord.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.attendanceRecord.count(),
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
      prisma.attendanceRecord.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.attendanceRecord.count({ where: { user_id } }),
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

  async getById(attendance_id: string) {
    return await prisma.attendanceRecord.findUnique({ where: { attendance_id } });
  }

  async update(attendance_id: string, data: UpdateAttendanceRequest) {
    return await prisma.attendanceRecord.update({ where: { attendance_id }, data });
  }

  async delete(attendance_id: string) {
    return await prisma.attendanceRecord.delete({ where: { attendance_id } });
  }
}
