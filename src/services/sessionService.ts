import { SessionRepository } from '../repositories/sessionRepository';

export class SessionService {
  private repo = new SessionRepository();

 async getSessionsByTeacher(
  teacherId: string,
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }
) {
  return await this.repo.getSessionsByTeacher(teacherId, filters);
}

 async getUpcomingClassesByStudent(
  studentId: string,
  filters: {
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
    courseId?: string;
  }
) {
  return await this.repo.getUpcomingClassesByStudent(studentId, filters);
}

}