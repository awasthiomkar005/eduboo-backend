import { PrismaClient, SessionStatus } from '@prisma/client';
import { getPrismaClient } from '../config/database';
import dayjs from 'dayjs';

type Filters = {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
};

type UpcomingClassFilters = {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  courseId?: string;
};

export class SessionRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

 async getSessionsByTeacher(
  teacherId: string,
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }
): Promise<{
  sessions: any[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const safePage = filters.page && filters.page > 0 ? filters.page : 1;
  const safeLimit = filters.limit && filters.limit > 0 ? filters.limit : 50;
  const skip = (safePage - 1) * safeLimit;

  const where: any = { teacher_id: teacherId };
  if (filters.status) where.status = filters.status;
  if (filters.dateFrom || filters.dateTo) {
    where.schedule_at = {};
    if (filters.dateFrom) where.schedule_at.gte = new Date(filters.dateFrom);
    if (filters.dateTo) where.schedule_at.lte = new Date(filters.dateTo);
  }

  const [sessions, total] = await Promise.all([
    this.db.session.findMany({
      where,
      orderBy: { schedule_at: 'desc' },
      skip,
      take: safeLimit,
    }),
    this.db.session.count({ where }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const pagesLeft = totalPages - safePage > 0 ? totalPages - safePage : 0;
  const totalItemsLeft = total - safePage * safeLimit > 0 ? total - safePage * safeLimit : 0;

  return {
    sessions,
    total,
    totalPages,
    currentPage: safePage,
    pagesLeft,
    totalItemsLeft,
  };
}

 async getUpcomingClassesByStudent(
  studentId: string,
  filters: UpcomingClassFilters
): Promise<{
  sessions: any[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}> {
  const safePage = filters.page && filters.page > 0 ? filters.page : 1;
  const safeLimit = filters.limit && filters.limit > 0 ? filters.limit : 10;
  const skip = (safePage - 1) * safeLimit;

  // Get current date/time
  const now = new Date();

  // Build where clause
  const where: any = {
    users: {
      some: {
        user_id: studentId,
      },
    },
    status: 'schedule',
    schedule_at: {
      gte: filters.dateFrom ? new Date(filters.dateFrom) : now,
    },
  };

  // Add dateTo filter if provided
  if (filters.dateTo) {
    where.schedule_at.lte = new Date(filters.dateTo);
  }

  // Add courseId filter if provided
  if (filters.courseId) {
    where.course_id = filters.courseId;
  }

  // Fetch sessions with related data
  const [sessions, total] = await Promise.all([
    this.db.session.findMany({
      where,
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        course: {
          include: {
            category: true,
          },
        },
        module: true,
        chapter: true,
        users: {
          where: {
            user_id: studentId,
          },
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
        slot: true,
      },
      orderBy: { schedule_at: 'asc' },
      skip,
      take: safeLimit,
    }),
    this.db.session.count({ where }),
  ]);

  const totalPages = Math.ceil(total / safeLimit);
  const pagesLeft = totalPages - safePage > 0 ? totalPages - safePage : 0;
  const totalItemsLeft = total - safePage * safeLimit > 0 ? total - safePage * safeLimit : 0;

  return {
    sessions,
    total,
    totalPages,
    currentPage: safePage,
    pagesLeft,
    totalItemsLeft,
  };
}

}