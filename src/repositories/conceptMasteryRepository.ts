import { PrismaClient, ConceptMastery, SkillStrength } from "@prisma/client";
import { getPrismaClient } from "../config/database";

export class ConceptMasteryRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    user_id: string;
    course_id: string;
    skill_name: string;
    score: number;
    strength: SkillStrength;
    last_tested: Date;
  }): Promise<ConceptMastery> {
    return this.db.conceptMastery.create({ data });
  }

  async findById(concept_id: string): Promise<ConceptMastery | null> {
    return this.db.conceptMastery.findUnique({ where: { concept_id } });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.db.conceptMastery.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      this.db.conceptMastery.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return { items, total, totalPages, currentPage: page, pagesLeft, totalItemsLeft };
  }

  async findByUser(user_id: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.db.conceptMastery.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      this.db.conceptMastery.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return { items, total, totalPages, currentPage: page, pagesLeft, totalItemsLeft };
  }

  async update(concept_id: string, data: Partial<ConceptMastery>): Promise<ConceptMastery> {
    return this.db.conceptMastery.update({
      where: { concept_id },
      data,
    });
  }

  async delete(concept_id: string) {
    return this.db.conceptMastery.delete({ where: { concept_id } });
  }
}
