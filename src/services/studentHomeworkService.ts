import { StudentHomeworkRepository } from '../repositories/studentHomeworkRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { HomeworkRepository } from '../repositories/homeworkRepository';

export interface SubmitHomeworkData {
  studentId: string;
  homeworkId: string;
  submittedData: any;
}

export interface GradeHomeworkData {
  studentHomeworkId: string;
  score: number;
  feedback: string;
  gradedById: string;
}

export class StudentHomeworkService {
  private studentHomeworkRepo: StudentHomeworkRepository;
  private homeworkRepo: HomeworkRepository;

  constructor() {
    this.studentHomeworkRepo = new StudentHomeworkRepository();
    this.homeworkRepo = new HomeworkRepository();
  }

  async getStudentHomework(studentId: string, status?: string) {
    return this.studentHomeworkRepo.listByStudent(studentId, status);
  }

  async getHomeworkSubmissions(homeworkId: string, status?: string) {
    const homework = await this.homeworkRepo.findById(homeworkId);
    if (!homework) {
      throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
    }

    return this.studentHomeworkRepo.listByHomework(homeworkId, status);
  }

  async submitHomework(data: SubmitHomeworkData) {
    const { studentId, homeworkId, submittedData } = data;
    
    // Check if homework exists
    const homework = await this.homeworkRepo.findById(homeworkId);
    if (!homework) {
      throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if homework is not past due (if end_date is set)
    if (homework.end_date && new Date() > homework.end_date) {
      throw new CustomError('Homework submission is past due', HTTP_STATUS.BAD_REQUEST);
    }

    // Find or create student homework record
    let studentHomework = await this.studentHomeworkRepo.findByStudentAndHomework(studentId, homeworkId);
    
    if (!studentHomework) {
      // If no record exists, create one
      studentHomework = await this.studentHomeworkRepo.create({
        student: { connect: { user_id: studentId } },
        homework: { connect: { homework_id: homeworkId } },
        status: 'SUBMITTED',
        submitted_at: new Date(),
        submitted_data: submittedData || {},
      });
    } else {
      // Update existing record
      studentHomework = await this.studentHomeworkRepo.update(studentHomework.id, {
        status: 'SUBMITTED',
        submitted_at: new Date(),
        submitted_data: submittedData || studentHomework.submitted_data,
      });
    }

    return studentHomework;
  }

  async updateHomeworkStatus(studentId: string, homeworkId: string, status: string) {
    const studentHomework = await this.studentHomeworkRepo.findByStudentAndHomework(studentId, homeworkId);
    
    if (!studentHomework) {
      throw new CustomError('Homework not found for this student', HTTP_STATUS.NOT_FOUND);
    }

    return this.studentHomeworkRepo.updateStatus(studentHomework.id, status);
  }

  // async gradeHomework(data: GradeHomeworkData) {
  //   const { studentHomeworkId, score, feedback, gradedById } = data;
    
  //   const studentHomework = await this.studentHomeworkRepo.findById(studentHomeworkId);
  //   if (!studentHomework) {
  //     throw new CustomError('Student homework not found', HTTP_STATUS.NOT_FOUND);
  //   }

  //   // Get homework to validate max score
  //   const homework = await this.homeworkRepo.findById(studentHomework.homework_id);
  //   if (!homework) {
  //     throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
  //   }

  //   // Validate score against max_score if it exists
  //   if (homework.max_score && score > homework.max_score) {
  //     throw new CustomError(`Score cannot be greater than maximum score (${homework.max_score})`, HTTP_STATUS.BAD_REQUEST);
  //   }

  //   return this.studentHomeworkRepo.gradeHomework(
  //     studentHomeworkId,
  //     score,
  //     feedback,
  //     gradedById
  //   );
  // }

  async getStudentHomeworkDetail(studentId: string, homeworkId: string) {
    const studentHomework = await this.studentHomeworkRepo.getStudentHomeworkWithDetails(studentId, homeworkId);
    
    if (!studentHomework) {
      // If no submission exists, return homework details with a default status
      const homework = await this.homeworkRepo.findByIdWithRelations(homeworkId);
      if (!homework) {
        throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
      }
      
      return {
        ...homework,
        student_status: 'NOT_STARTED',
        submitted_at: null,
        submitted_data: null,
        score: null,
        feedback: null,
        graded_at: null,
      };
    }

    return studentHomework;
  }

  async getOverdueHomeworks() {
    const now = new Date();
    
    // Find all homeworks that have an end_date in the past
    const overdueHomeworks = await this.homeworkRepo.findOverdueHomeworks(now);
    
    // Update status to OVERDUE for students who haven't submitted
    for (const homework of overdueHomeworks) {
      await this.studentHomeworkRepo.updateOverdueStatus(homework.homework_id, now);
    }
    
    return overdueHomeworks;
  }
}
