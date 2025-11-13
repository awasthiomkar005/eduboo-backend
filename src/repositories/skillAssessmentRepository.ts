
import { PrismaClient, SkillAssessment } from "@prisma/client";
import { getPrismaClient } from "../config/database";

export class SkillAssessmentRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

 
  async create(data: {
    user_id: string;
    course_id: string;
    problem_solving?: number;
    speed?: number;
    accuracy?: number;
    analytical_thinking?: number;
    creativity?: number;
    assessed_at?: Date;
  }): Promise<SkillAssessment> {
    return this.db.skillAssessment.create({ data });
  }

 
  async getByUserId(user_id: string): Promise<SkillAssessment[]> {
    return this.db.skillAssessment.findMany({
      where: { user_id },
      orderBy: { assessed_at: "desc" },
    });
  }


  async getById(assessment_id: string): Promise<SkillAssessment | null> {
    return this.db.skillAssessment.findUnique({ where: { assessment_id } });
  }


  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    assessments: SkillAssessment[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [assessments, total] = await Promise.all([
      this.db.skillAssessment.findMany({
        skip,
        take: limit,
        orderBy: { assessed_at: "desc" },
      }),
      this.db.skillAssessment.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      assessments,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }



async findByUserId(
    user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    assessments: SkillAssessment[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [assessments, total] = await Promise.all([
      this.db.skillAssessment.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { assessed_at: "desc" },
      }),
      this.db.skillAssessment.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = Math.max(totalPages - page, 0);
    const totalItemsLeft = Math.max(total - page * limit, 0);

    return { assessments, total, totalPages, currentPage: page, pagesLeft, totalItemsLeft };
  }





  
  async update(assessment_id: string, data: Partial<SkillAssessment>) {
    return this.db.skillAssessment.update({
      where: { assessment_id },
      data,
    });
  }

  
  async delete(assessment_id: string) {
  return this.db.skillAssessment.delete({
    where: { assessment_id },
  });
}

}
