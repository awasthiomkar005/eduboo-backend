import { TopicProgressRepository } from "../repositories/topicProgressRepository";

export class TopicProgressService {
  private repo: TopicProgressRepository;

  constructor() {
    this.repo = new TopicProgressRepository();
  }

  async createProgress(data: {
    user_id: string;
    course_id: string;
    module_id: string;
    chapter_id?: string | null;
    topic_name: string;
    completion_status?: number;
    mastery_level?: string;
    time_spent?: number;
    last_accessed?: string;
  }) {
  
    const payload = {
      ...data,
      last_accessed: data.last_accessed ? new Date(data.last_accessed) : undefined,
    };
    return this.repo.create(payload as any);
  }

  async getById(progress_id: string) {
    return this.repo.findById(progress_id);
  }

  async getAll(page: number = 1, limit: number = 10) {
    return this.repo.findAll(page, limit);
  }

  async getByUser(user_id: string, page: number = 1, limit: number = 10) {
    return this.repo.findByUser(user_id, page, limit);
  }

  async updateProgress(progress_id: string, data: Partial<{
    course_id: string;
    module_id: string;
    chapter_id?: string | null;
    topic_name: string;
    completion_status?: number;
    mastery_level?: string;
    time_spent?: number;
    last_accessed?: string;
  }>) {
    const payload = {
      ...data,
      last_accessed: data.last_accessed ? new Date(data.last_accessed) : undefined,
    };

    return this.repo.update(progress_id, payload as any);
  }

  async deleteProgress(progress_id: string) {
    return this.repo.delete(progress_id);
  }
}
