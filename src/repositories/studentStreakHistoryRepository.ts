import { PrismaClient,StudentStreakHistory } from "@prisma/client";
import { getPrismaClient } from "../config/database";

export class StudentStreakHistoryRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    profile_id: string;
    date: Date;
    exp_earned?: number;
    is_active?: boolean;
  }) {
    return this.db.studentStreakHistory.create({ data });
  }

  async getByProfileId(profile_id: string) {
    return this.db.studentStreakHistory.findMany({
      where: { profile_id },
      orderBy: { date: "desc" },
    });
  }

  async getById(streak_id: string) {
    return this.db.studentStreakHistory.findUnique({ where: { streak_id } });
  }



async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    streaks: StudentStreakHistory[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [streaks, total] = await Promise.all([
      this.db.studentStreakHistory.findMany({
        skip,
        take: limit,
        orderBy: { date: "desc" }, // ensure 'date' exists in schema
      }),
      this.db.studentStreakHistory.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      streaks,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }



  async update(streak_id: string, data: any) {
    return this.db.studentStreakHistory.update({
      where: { streak_id },
      data,
    });
  }

  async delete(streak_id: string) {
    return this.db.studentStreakHistory.delete({ where: { streak_id } });
  }
}
