import { PrismaClient, Prisma, StudentAssignment } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class StudentAssignmentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: Prisma.StudentAssignmentCreateInput): Promise<StudentAssignment> {
    return this.db.studentAssignment.create({ data });
  }

  async findByStudentAndAssignment(studentId: string, assignmentId: string): Promise<StudentAssignment | null> {
    return this.db.studentAssignment.findFirst({
      where: { student_id: studentId, assignment_id: assignmentId },
      include: { assignment: true },
    });
  }

  async update(id: string, data: Prisma.StudentAssignmentUpdateInput): Promise<StudentAssignment> {
    return this.db.studentAssignment.update({ where: { id }, data });
  }

  async updateStatus(id: string, status: string, submittedData?: any): Promise<StudentAssignment> {
    const data: any = { status };
    if (status === 'SUBMITTED') {
      data.submitted_at = new Date();
      if (submittedData) data.submitted_data = submittedData;
    }
    return this.update(id, data);
  }

  async listByStudent(studentId: string, status?: string) {
    const where: any = { student_id: studentId };
    if (status) where.status = status;
    return this.db.studentAssignment.findMany({
      where,
      include: {
        assignment: {
          include: {
            module: true,
            course: true,
            creator: { select: { full_name: true, email: true } },
          },
        },
      },
      orderBy: { assignment: { end_date: 'asc' } },
    });
  }

  async listByAssignment(assignmentId: string, status?: string) {
    const where: any = { assignment_id: assignmentId };
    if (status) where.status = status;
    return this.db.studentAssignment.findMany({
      where,
      include: {
        student: { select: { user_id: true, full_name: true, email: true } },
      },
      orderBy: { updated_at: 'desc' },
    });
  }

  async getStudentAssignmentWithDetails(studentId: string, assignmentId: string) {
    return this.db.studentAssignment.findFirst({
      where: { student_id: studentId, assignment_id: assignmentId },
      include: {
        assignment: {
          include: {
            module: true,
            course: true,
            creator: { select: { full_name: true, email: true } },
          },
        },
      },
    });
  }
}




