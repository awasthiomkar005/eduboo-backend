import { StudentStreakHistoryRepository } from "../repositories/studentStreakHistoryRepository";

export class StudentStreakHistoryService {
  private repo: StudentStreakHistoryRepository;

  constructor() {
    this.repo = new StudentStreakHistoryRepository();
  }

  async createStreak(data: {
    profile_id: string;
    date: string;
    exp_earned?: number;
    is_active?: boolean;
  }) {
    return this.repo.create({
      ...data,
      date: new Date(data.date),
    });
  }

  async getHistoryByProfileId(profile_id: string) {
    return this.repo.getByProfileId(profile_id);
  }

  async getStreakById(streak_id: string) {
    return this.repo.getById(streak_id);
  }

  async getAllStreaks(page: number, limit: number) {
    return await this.repo.findAll(page, limit);
  }



  async updateStreak(
    streak_id: string,
    data: { date?: Date; exp_earned?: number; is_active?: boolean }
  ) {
    return this.repo.update(streak_id, data);
  }

  async deleteStreak(streak_id: string) {
    return this.repo.delete(streak_id);
  }
}
