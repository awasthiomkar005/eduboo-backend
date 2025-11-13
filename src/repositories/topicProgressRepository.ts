import { PrismaClient, TopicProgress , MasteryLevel 
} from "@prisma/client";
import { getPrismaClient } from "../config/database";

export class TopicProgressRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(data: {
    user_id: string;
    course_id: string;
    module_id: string;
    chapter_id?: string | null;
    topic_name: string;
    completion_status?: number;
    mastery_level?: MasteryLevel; 
    time_spent?: number;
    last_accessed?: Date;
  }): Promise<TopicProgress> {
    return this.db.topicProgress.create({
      data: {
        user_id: data.user_id,
        course_id: data.course_id,
        module_id: data.module_id,
        chapter_id: data.chapter_id,
        topic_name: data.topic_name,
        completion_status: data.completion_status ?? 0,
        mastery_level: data.mastery_level ?? MasteryLevel.not_started, // ✅ Enum default
        time_spent: data.time_spent ?? 0,
        last_accessed: data.last_accessed ?? new Date(),
      },
    });
  }


  async findById(progress_id: string): Promise<TopicProgress | null> {
    return this.db.topicProgress.findUnique({ where: { progress_id } });
  }

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    streaks?: any;
    progress: TopicProgress[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [progressList, total] = await Promise.all([
      this.db.topicProgress.findMany({
        skip,
        take: limit,
        orderBy: { last_accessed: "desc" },
      }),
      this.db.topicProgress.count(),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      progress: progressList,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }

  async findByUser(
    user_id: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    progress: TopicProgress[];
    total: number;
    totalPages: number;
    currentPage: number;
    pagesLeft: number;
    totalItemsLeft: number;
  }> {
    const skip = (page - 1) * limit;

    const [progressList, total] = await Promise.all([
      this.db.topicProgress.findMany({
        where: { user_id },
        skip,
        take: limit,
        orderBy: { last_accessed: "desc" },
      }),
      this.db.topicProgress.count({ where: { user_id } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      progress: progressList,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }

  async update(progress_id: string, data: Partial<any>): Promise<TopicProgress> {
    return this.db.topicProgress.update({ where: { progress_id }, data });
  }

  async delete(progress_id: string) {
    return this.db.topicProgress.delete({ where: { progress_id } });
  }

  
  async findByUnique(user_id: string, course_id: string, module_id: string, topic_name: string) {
    return this.db.topicProgress.findUnique({
      where: {
        user_id_course_id_module_id_topic_name: {
          user_id,
          course_id,
          module_id,
          topic_name,
        },
      } as any, 
    });
  }
}
