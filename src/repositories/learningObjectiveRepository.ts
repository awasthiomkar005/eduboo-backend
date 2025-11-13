

import { PrismaClient } from "@prisma/client";
import { CreateLearningObjective } from "../dto/request/learningObjectiveRequest";

const prisma = new PrismaClient();

export class LearningObjectiveRepository {
  async create(data: CreateLearningObjective) {
    return prisma.learningObjective.create({ data });
  }

  async findAll() {
    return prisma.learningObjective.findMany({
      include: {
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }

  async findByCourseId(course_id: string) {
    return prisma.learningObjective.findMany({
      where: { course_id },
      orderBy: { created_at: "desc" },
    });
  }

  async findById(Learning_objective_id: string) {
    return prisma.learningObjective.findUnique({
      where: { Learning_objective_id },
    });
  }

  async updateById(Learning_objective_id: string, data: Partial<CreateLearningObjective>) {
    return prisma.learningObjective.update({
      where: { Learning_objective_id },
      data,
    });
  }

  async deleteById(Learning_objective_id: string) {
    return prisma.learningObjective.delete({
      where: { Learning_objective_id },
    });
  }
}
