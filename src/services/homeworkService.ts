import { HomeworkRepository } from '../repositories/homeworkRepository';
import { StudentHomeworkRepository } from '../repositories/studentHomeworkRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

export interface CreateHomeworkData {
  course_id: string;
  chapter_id: string;
  title: string;
  description?: string;
  type: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
  created_by: string;
}

export interface UpdateHomeworkData {
  title?: string;
  description?: string;
  type?: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
}

export class HomeworkService {
  private homeworkRepository: HomeworkRepository;
  private studentHomeworkRepository: StudentHomeworkRepository;

  constructor() {
    this.homeworkRepository = new HomeworkRepository();
    this.studentHomeworkRepository = new StudentHomeworkRepository();
  }

  async createHomework(homeworkData: CreateHomeworkData) {
    if (!homeworkData.course_id || !homeworkData.chapter_id ||
        !homeworkData.title || !homeworkData.type || !homeworkData.created_by) {
      throw new CustomError('Missing required fields', HTTP_STATUS.BAD_REQUEST);
    }

    const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
    if (!validTypes.includes(homeworkData.type)) {
      throw new CustomError('Invalid homework type', HTTP_STATUS.BAD_REQUEST);
    }

    const courseExists = await this.homeworkRepository.courseExists(homeworkData.course_id);
    if (!courseExists) {
      throw new CustomError('Course not found', HTTP_STATUS.BAD_REQUEST);
    }

    const chapterExists = await this.homeworkRepository.chapterExists(homeworkData.chapter_id, homeworkData.course_id);
    if (!chapterExists) {
      throw new CustomError('Chapter not found or does not belong to the course', HTTP_STATUS.BAD_REQUEST);
    }

    const creatorExists = await this.homeworkRepository.userExists(homeworkData.created_by);
    if (!creatorExists) {
      throw new CustomError('Creator not found', HTTP_STATUS.BAD_REQUEST);
    }

    const homework = await this.homeworkRepository.create({
      ...homeworkData,
      reward_points: homeworkData.reward_points || 10,
    } as any);

    // Fan out StudentHomework rows for all active enrollments in the course
    try {
      await this.homeworkRepository.createStudentHomeworksForCourse(
        homework.course_id,
        homework.homework_id
      );
    } catch (err) {
      // Do not block homework creation if fan-out fails; log and continue
      console.error('Failed to create StudentHomework records:', err);
    }

    return homework;
  }

  async getHomeworksByCourse(courseId: string) {
    const courseExists = await this.homeworkRepository.courseExists(courseId);
    if (!courseExists) {
      throw new CustomError('Course not found', HTTP_STATUS.NOT_FOUND);
    }

    return this.homeworkRepository.findByCourse(courseId);
  }

  async getAllHomeworks(page: number = 1, limit: number = 10) {
    return this.homeworkRepository.findAll(page, limit);
  }

  async getHomeworkById(homeworkId: string) {
    const homework = await this.homeworkRepository.findByIdWithRelations(homeworkId);
    if (!homework) {
      throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
    }
    return homework;
  }

  async updateHomework(homeworkId: string, homeworkData: UpdateHomeworkData) {
    const existing = await this.homeworkRepository.findById(homeworkId);
    if (!existing) {
      throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
    }

    if (homeworkData.type) {
      const validTypes = ['QUIZ', 'PUZZLE', 'CODE_EXERCISE'];
      if (!validTypes.includes(homeworkData.type)) {
        throw new CustomError('Invalid homework type', HTTP_STATUS.BAD_REQUEST);
      }
    }

    // Separate student status (not a Homework field) from Homework update payload
    const anyData = homeworkData as any;
    const providedStatus: string | undefined = anyData?.status;
    if (providedStatus !== undefined) {
      delete anyData.status;
    }

    const updated = await this.homeworkRepository.update(homeworkId, anyData);

    // Optional: bulk update StudentHomework status when provided in body
    if (typeof providedStatus === 'string' && providedStatus.length > 0) {
      try {
        // Normalize dashed to underscored status e.g. IN-PROGRESS -> IN_PROGRESS
        const normalized = providedStatus.replace(/-/g, '_');
        await this.studentHomeworkRepository.updateStatusByHomework(
          homeworkId,
          normalized
        );
      } catch (e) {
        console.error('Bulk update of StudentHomework status failed:', e);
      }
    }

    return updated;
  }

  async deleteHomework(homeworkId: string) {
    const existing = await this.homeworkRepository.findById(homeworkId);
    if (!existing) {
      throw new CustomError('Homework not found', HTTP_STATUS.NOT_FOUND);
    }

    await this.homeworkRepository.delete(homeworkId);
    return { message: 'Homework deleted successfully' };
  }

  async getHomeworksByChapter(chapterId: string) {
    const chapterExists = await this.homeworkRepository.chapterExists(chapterId);
    if (!chapterExists) {
      throw new CustomError('Chapter not found', HTTP_STATUS.NOT_FOUND);
    }

    return this.homeworkRepository.findByChapter(chapterId);
  }

  async getHomeworksByCreator(creatorId: string, page: number = 1, limit: number = 10) {
    const creatorExists = await this.homeworkRepository.userExists(creatorId);
    if (!creatorExists) {
      throw new CustomError('Creator not found', HTTP_STATUS.NOT_FOUND);
    }

    return this.homeworkRepository.findByCreator(creatorId, page, limit);
  }
}
