import { StudentAssignmentRepository } from '../repositories/studentAssignmentRepository';
import { AssignmentRepository } from '../repositories/assignmentRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface SubmitAssignmentData {
  studentId: string;
  assignmentId: string;
  submittedData: any;
}

export class StudentAssignmentService {
  private studentAssignmentRepo: StudentAssignmentRepository;
  private assignmentRepo: AssignmentRepository;

  constructor() {
    this.studentAssignmentRepo = new StudentAssignmentRepository();
    this.assignmentRepo = new AssignmentRepository();
  }

  async getStudentAssignments(studentId: string, status?: string) {
    return this.studentAssignmentRepo.listByStudent(studentId, status);
  }

  async getStudentAssignmentDetail(studentId: string, assignmentId: string) {
    const record = await this.studentAssignmentRepo.getStudentAssignmentWithDetails(studentId, assignmentId);
    if (record) return record;

    const assignment = await this.assignmentRepo.findByIdWithRelations(assignmentId);
    if (!assignment) throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);

    return {
      ...assignment,
      student_status: 'NOT_STARTED',
      submitted_at: null,
      submitted_data: null,
      score: null,
      feedback: null,
      graded_at: null,
    };
  }

  async submitAssignment(data: SubmitAssignmentData) {
    const { studentId, assignmentId, submittedData } = data;
    const assignment = await this.assignmentRepo.findById(assignmentId);
    if (!assignment) throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);

    if (assignment.end_date && new Date() > assignment.end_date) {
      throw new CustomError('Assignment submission is past due', HTTP_STATUS.BAD_REQUEST);
    }

    let sa = await this.studentAssignmentRepo.findByStudentAndAssignment(studentId, assignmentId);
    if (!sa) {
      sa = await this.studentAssignmentRepo.create({
        student: { connect: { user_id: studentId } },
        assignment: { connect: { assignment_id: assignmentId } },
        status: 'SUBMITTED' as any,
        submitted_at: new Date(),
        submitted_data: submittedData || {},
      });
    } else {
      sa = await this.studentAssignmentRepo.update(sa.id, {
        status: 'SUBMITTED',
        submitted_at: new Date(),
        submitted_data: submittedData || sa.submitted_data,
      });
    }
    return sa;
  }

  async updateAssignmentStatus(studentId: string, assignmentId: string, status: string) {
    const sa = await this.studentAssignmentRepo.findByStudentAndAssignment(studentId, assignmentId);
    if (!sa) throw new CustomError('Assignment not found for this student', HTTP_STATUS.NOT_FOUND);
    return this.studentAssignmentRepo.updateStatus(sa.id, status);
  }
}




