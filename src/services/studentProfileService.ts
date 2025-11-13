import { StudentProfileRepository } from '../repositories/studentProfileRepository';
import { CreateStudentProfileRequest, UpdateStudentProfileRequest } from '../dto/request/studentProfileRequest';
import { StudentProfileResponse } from '../dto/response/studentProfileResponse';

export class StudentProfileService {
  private repo = new StudentProfileRepository();

  private mapToResponse(profile: any): StudentProfileResponse {
    return {
      profile_id: profile.profile_id,
      user_id: profile.user_id,
      grade: profile.grade ?? null,
      location: profile.location ?? null,
      joining_date: profile.joining_date ? profile.joining_date.toISOString() : null,
      total_exp: profile.total_exp,
      current_level: profile.current_level,
      exp_to_next_level: profile.exp_to_next_level,
      day_streak: profile.day_streak,
      best_subject: profile.best_subject ?? null,
      last_activity: profile.last_activity ? profile.last_activity.toISOString() : null,
      created_at: profile.created_at?.toISOString(),
      updated_at: profile.updated_at?.toISOString(),
    };
  }

  async createStudentProfile(data: CreateStudentProfileRequest): Promise<StudentProfileResponse> {
    const profile = await this.repo.createStudentProfile(data);
    return this.mapToResponse(profile);
  }

  async getStudentProfiles(page: number, limit: number) {
    const result = await this.repo.getStudentProfiles(page, limit);
    return {
      ...result,
      profiles: result.profiles.map((p: any) => this.mapToResponse(p)),
    };
  }

  async getStudentProfileById(profile_id: string): Promise<StudentProfileResponse | null> {
    const profile = await this.repo.getStudentProfileById(profile_id);
    return profile ? this.mapToResponse(profile) : null;
  }

  async updateStudentProfile(profile_id: string, data: UpdateStudentProfileRequest): Promise<StudentProfileResponse> {
    const profile = await this.repo.updateStudentProfile(profile_id, data);
    return this.mapToResponse(profile);
  }

  async deleteStudentProfile(profile_id: string) {
    await this.repo.deleteStudentProfile(profile_id);
    return { success: true, message: 'Student profile deleted successfully' };
  }
}
