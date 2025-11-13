import { Prisma, PrismaClient, Homework, AssignmentType } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class HomeworkRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(homeworkData: {
    course_id: string;
    chapter_id: string;
    title: string;
    description: string;
    instructions?: string;
    resources?: any;
    max_score?: number;
    start_date?: Date;
    end_date?: Date;
    allow_late?: boolean;
    late_penalty?: number;
    type: AssignmentType;
    language?: string;
    starter_code?: string;
    metadata?: any;
    reward_points: number;
    created_by: string;
  }): Promise<Homework> {
    return this.db.homework.create({
      data: homeworkData,
    });
  }

  async findById(id: string): Promise<Homework | null> {
    return this.db.homework.findUnique({
      where: { homework_id: id },
    });
  }

  async findByIdWithRelations(id: string) {
    return this.db.homework.findUnique({
      where: { homework_id: id },
      include: {
        course: true,
        chapter: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByCourse(courseId: string): Promise<Homework[]> {
    return this.db.homework.findMany({
      where: { course_id: courseId },
      include: {
        chapter: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findByChapter(chapterId: string): Promise<Homework[]> {
    return this.db.homework.findMany({
      where: { chapter_id: chapterId },
      include: {
        course: true,
        creator: {
          select: {
            user_id: true,
            full_name: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findByCreator(creatorId: string, page: number = 1, limit: number = 10): Promise<{
    homeworks: Homework[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [homeworks, total] = await Promise.all([
      this.db.homework.findMany({
        where: { created_by: creatorId },
        skip,
        take: limit,
        include: {
          course: true,
          chapter: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.homework.count({
        where: { created_by: creatorId },
      }),
    ]);

    return {
      homeworks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [homeworks, total] = await Promise.all([
      this.db.homework.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.db.homework.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      homeworks,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }

  async update(
    id: string,
    homeworkData: Prisma.HomeworkUpdateInput
  ): Promise<Homework> {
    return this.db.homework.update({
      where: { homework_id: id },
      data: homeworkData,
    });
  }

  async delete(id: string): Promise<Homework> {
    return this.db.homework.delete({
      where: { homework_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const homework = await this.db.homework.findUnique({
      where: { homework_id: id },
      select: { homework_id: true },
    });
    return !!homework;
  }

  async courseExists(courseId: string): Promise<boolean> {
    const course = await this.db.course.findUnique({
      where: { course_id: courseId },
      select: { course_id: true },
    });
    return !!course;
  }

  async chapterExists(chapterId: string, courseId?: string): Promise<boolean> {
    const whereClause: any = { chapter_id: chapterId };
    if (courseId) whereClause.module = { course_id: courseId };

    const chapter = await this.db.chapter.findFirst({
      where: whereClause,
      select: { chapter_id: true },
    });
    return !!chapter;
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: { user_id: userId },
      select: { user_id: true },
    });
    return !!user;
  }

  async searchHomeworks(query: string, page: number = 1, limit: number = 10): Promise<{
    homeworks: Homework[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [homeworks, total] = await Promise.all([
      this.db.homework.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: {
          course: true,
          chapter: true,
          creator: {
            select: {
              user_id: true,
              full_name: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      }),
      this.db.homework.count({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      homeworks,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOverdueHomeworks(now: Date): Promise<Homework[]> {
    // Use a raw query to find homeworks with pending submissions
    const result = await this.db.$queryRaw<Homework[]>`
      SELECT DISTINCT h.*
      FROM "Homework" h
      JOIN "StudentHomework" sh ON h.homework_id = sh.homework_id
      WHERE h.end_date < ${now}
      AND sh.status IN ('PENDING', 'IN_PROGRESS')
      AND sh.submitted_at IS NULL
    `;

    return result;
  }

  async createStudentHomeworksForCourse(courseId: string, homeworkId: string) {
    // Fetch active enrollments for the course
    const enrollments = await this.db.enrollment.findMany({
      where: {
        course_id: courseId,
        is_active: true,
      },
      select: { user_id: true },
    });

    if (enrollments.length === 0) {
      return { createdCount: 0 };
    }

    // Create StudentHomework records for enrolled students, skipping duplicates
    const data = enrollments.map((e) => ({
      homework_id: homeworkId,
      student_id: e.user_id,
      status: 'PENDING' as any,
    }));

    const result = await this.db.studentHomework.createMany({
      data,
      skipDuplicates: true,
    });

    return { createdCount: result.count };
  }
}
