import { PrismaClient, StudentHomework, Prisma } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class StudentHomeworkRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: Prisma.StudentHomeworkCreateInput): Promise<StudentHomework> {
    return this.db.studentHomework.create({
      data,
    });
  }

  async findById(id: string): Promise<StudentHomework | null> {
    return this.db.studentHomework.findUnique({
      where: { id },
      include: {
        homework: {
          include: {
            chapter: true,
            course: true,
          },
        },
      },
    });
  }

  async findByStudentAndHomework(studentId: string, homeworkId: string): Promise<StudentHomework | null> {
    return this.db.studentHomework.findFirst({
      where: {
        student_id: studentId,
        homework_id: homeworkId,
      },
      include: {
        homework: true,
      },
    });
  }

  async update(id: string, data: Prisma.StudentHomeworkUpdateInput): Promise<StudentHomework> {
    return this.db.studentHomework.update({
      where: { id },
      data,
    });
  }

  async listByStudent(studentId: string, status?: string) {
    const where: any = { student_id: studentId };
    if (status) where.status = status;

    return this.db.studentHomework.findMany({
      where,
      include: {
        homework: {
          include: {
            chapter: true,
            course: true,
            creator: {
              select: {
                full_name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        homework: {
          end_date: 'asc',
        },
      },
    });
  }

  async listByHomework(homeworkId: string, status?: string) {
    const where: any = { homework_id: homeworkId };
    if (status) where.status = status;

    return this.db.studentHomework.findMany({
      where,
      include: {
        student: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async updateStatus(id: string, status: string, submittedData?: any): Promise<StudentHomework> {
    const data: any = { status };
    
    if (status === 'SUBMITTED') {
      data.submitted_at = new Date();
      if (submittedData) {
        data.submitted_data = submittedData;
      }
    }

    return this.update(id, data);
  }

  async updateStatusByHomework(homeworkId: string, status: string): Promise<number> {
    const result = await this.db.studentHomework.updateMany({
      where: { homework_id: homeworkId },
      data: { status },
    });
    return result.count;
  }

//  async gradeHomework(id: string, score: number, feedback: string, gradedById: string): Promise<StudentHomework> {
//   return this.update(id, {
//     score,
//     feedback,
//     status: 'GRADED',
//     graded_by_id: gradedById,  // This is the correct field name
//     graded_at: new Date(),
//   });
// }

  async getStudentHomeworkWithDetails(studentId: string, homeworkId: string) {
    return this.db.studentHomework.findFirst({
      where: {
        student_id: studentId,
        homework_id: homeworkId,
      },
      include: {
        homework: {
          include: {
            chapter: true,
            course: true,
            creator: {
              select: {
                full_name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async updateOverdueStatus(homeworkId: string, now: Date) {
    // Update all student homeworks that are still PENDING or IN_PROGRESS for the given homework
    return this.db.studentHomework.updateMany({
      where: {
        homework_id: homeworkId,
        status: {
          in: ['PENDING', 'IN_PROGRESS']
        },
        // Only update if not already submitted
        submitted_at: null
      },
      data: {
        status: 'OVERDUE',
        updated_at: now
      }
    });
  }
}
