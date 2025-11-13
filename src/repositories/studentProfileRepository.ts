import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class StudentProfileRepository {
  async createStudentProfile(data: any) {
    return await prisma.studentProfile.create({ data });
  }

  async getStudentProfiles(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [profiles, total] = await Promise.all([
      prisma.studentProfile.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.studentProfile.count(),
    ]);

    return {
      profiles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStudentProfileById(profile_id: string) {
    return await prisma.studentProfile.findUnique({ where: { profile_id } });
  }

  async updateStudentProfile(profile_id: string, data: any) {
    return await prisma.studentProfile.update({ where: { profile_id }, data });
  }

  async deleteStudentProfile(profile_id: string) {
    return await prisma.studentProfile.delete({ where: { profile_id } });
  }
}
