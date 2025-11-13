import { AttendanceRepository } from "../repositories/attendanceRepository";
import { CreateAttendanceRequest, UpdateAttendanceRequest } from "../dto/request/attendanceRequest";

export class AttendanceService {
  private repo = new AttendanceRepository();

  async create(data: CreateAttendanceRequest) {
    return this.repo.create(data);
  }

  async getAll(page: number, limit: number) {
    return this.repo.getAll(page, limit);
  }

  async getByUser(user_id: string, page: number, limit: number) {
    return this.repo.getByUser(user_id, page, limit);
  }

  async getById(attendance_id: string) {
    return this.repo.getById(attendance_id);
  }

  async update(attendance_id: string, data: UpdateAttendanceRequest) {
    return this.repo.update(attendance_id, data);
  }

  async delete(attendance_id: string) {
    return this.repo.delete(attendance_id);
  }
}
