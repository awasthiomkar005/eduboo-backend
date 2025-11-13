import { PrismaClient, Course, Difficulty } from '@prisma/client';
import { getPrismaClient } from '../config/database';

export class CourseRepository {
  private db: PrismaClient;

  constructor() {
    this.db = getPrismaClient();
  }

  async create(courseData: {
    course_name: string;
    category_id: string;
    course_description?: string;
    course_content?: string;
    difficulty: Difficulty;
    course_duration: string;
    course_image?: string;
    language: string;
    min_age: string;
    max_age: string;
    teacher_id?: string;
  }): Promise<Course> {
    return this.db.course.create({
      data: courseData,
    });
  }

  async findById(course_id: string) {
    return this.db.course.findUnique({
      where: { course_id },
      select: {
        course_id: true,
        course_name: true,
        course_description: true,
        course_image: true,
        difficulty: true,
        course_duration: true,
        language: true,
        min_age: true,
        max_age: true,
        created_at: true,
        updated_at: true,
        category_id: true,
        teachers: true,
        learning_objectives: {
          select: {
            Learning_objective_id: true,
            description: true,
            icon_url: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
  }


  async findByIdWithRelations(id: string) {
    return this.db.course.findUnique({
      where: { course_id: id },
      include: {
        category: true,
        modules: true,
        enrollments: true,
      },
    });
  }

  // ✅ Used by getAllCourses (NO modules, slots, enrollments)
  // async findAll(page: number = 1, limit: number = 10): Promise<{
  //   courses: Course[];
  //   total: number;
  //   totalPages: number;
  // }> {
  //   const skip = (page - 1) * limit;

  //   const [courses, total] = await Promise.all([
  //     this.db.course.findMany({
  //       skip,
  //       take: limit,
  //       include: { category: true }, // only category
  //       orderBy: { created_at: 'desc' },
  //     }),
  //     this.db.course.count(),
  //   ]);

  //   return {
  //     courses,
  //     total,
  //     totalPages: Math.ceil(total / limit),
  //   };
  // }

  // async findAll(page: number = 1, limit: number = 10): Promise<Course[]> {
  //   const skip = (page - 1) * limit;

  //   return this.db.course.findMany({
  //     skip,
  //     take: limit,
  //     orderBy: { created_at: 'desc' },
  //   });
  // }

  //   async findAll(page: number = 1, limit: number = 10) {
  //   const skip = (page - 1) * limit;

  //   const [courses, total] = await Promise.all([
  //     this.db.course.findMany({
  //       skip,
  //       take: limit,
  //       orderBy: { created_at: 'desc' },
  //       include: {
  //         category: true, // optional: include related data
  //       },
  //     }),
  //     this.db.course.count(),
  //   ]);

  //   const totalPages = Math.ceil(total / limit);
  //   const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  //   const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  //   return {
  //     courses,
  //     total,
  //     totalPages,
  //     currentPage: page,
  //     pagesLeft,

  //   };
  // }



  // async findAll(page: number = 1, limit: number = 10) {
  //   const skip = (page - 1) * limit;

  //   const [courses, total] = await Promise.all([
  //     this.db.course.findMany({
  //       skip,
  //       take: limit,
  //       orderBy: { created_at: 'desc' },
  //     }),
  //     this.db.course.count(),
  //   ]);

  //   const totalPages = Math.ceil(total / limit);
  //   const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
  //   const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

  //   return {
  //     courses,
  //     total,
  //     totalPages,
  //     currentPage: page,
  //     pagesLeft,
  //     totalItemsLeft,
  //   };
  // }

  async findAll(page: number = 1, limit: number = 10, courseType?: 'one_to_one' | 'one_to_many' | 'recorded') {
    const skip = (page - 1) * limit;

    const whereClause = courseType ? { course_type: courseType } : {};

    const [courses, total] = await Promise.all([
      this.db.course.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          course_id: true,
          course_name: true,
          course_description: true,
          course_image: true,
          difficulty: true,
          course_duration: true,
          language: true,
          min_age: true,
          max_age: true,
          course_type: true,
          created_at: true,
          updated_at: true,
          category_id: true,
          teachers: true,
          learning_objectives: {
            select: {
              Learning_objective_id: true,
              description: true,
              icon_url: true,
            },
          },
        },
      }),
      this.db.course.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const pagesLeft = totalPages - page > 0 ? totalPages - page : 0;
    const totalItemsLeft = total - page * limit > 0 ? total - page * limit : 0;

    return {
      courses,
      total,
      totalPages,
      currentPage: page,
      pagesLeft,
      totalItemsLeft,
    };
  }




  async findByCategory(categoryId: string): Promise<Course[]> {
    return this.db.course.findMany({
      where: { category_id: categoryId },
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, courseData: Partial<Course>): Promise<Course> {
    return this.db.course.update({
      where: { course_id: id },
      data: courseData,
    });
  }

  async delete(id: string): Promise<Course> {
    return this.db.course.delete({
      where: { course_id: id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const course = await this.db.course.findUnique({
      where: { course_id: id },
      select: { course_id: true },
    });
    return !!course;
  }

  async categoryExists(categoryId: string): Promise<boolean> {
    const category = await this.db.category.findUnique({
      where: { category_id: categoryId },
      select: { category_id: true },
    });
    return !!category;
  }

  async hasModules(courseId: string): Promise<boolean> {
    const module = await this.db.module.findFirst({
      where: { course_id: courseId },
      select: { module_id: true },
    });
    return !!module;
  }

  async hasEnrollments(courseId: string): Promise<boolean> {
    const enrollment = await this.db.enrollment.findFirst({
      where: { course_id: courseId },
      select: { enrollment_id: true },
    });
    return !!enrollment;
  }

  async getCourseStats(courseId: string): Promise<{
    totalModules: number;
    totalStudents: number;
    totalAssignments: number;
  }> {
    const [totalModules, totalStudents, totalAssignments] = await Promise.all([
      this.db.module.count({ where: { course_id: courseId } }),
      this.db.enrollment.count({ where: { course_id: courseId } }),
      this.db.assignment.count({ where: { course_id: courseId } }),
    ]);

    return { totalModules, totalStudents, totalAssignments };
  }

  async getAllCountries() {
    return this.db.country.findMany({
      include: { zone: true, regional_config: true },
    });
  }

  async getPurchasedCourses(userId: string) {
    const enrollments = await this.db.enrollment.findMany({
      where: {
        user_id: userId,
        enrollment_type: 'paid',
        is_active: true,
      },
      include: {
        course: {
          include: {
            category: true,
            modules: {
              include: {
                chapters: true,
                assignments: true,
              },
            },
            learning_objectives: true,
            course_pricing: true,
          },
        },
      },
    });

    // Deduplicate courses by course_id to prevent returning the same course multiple times
    const uniqueCourses = new Map();
    enrollments.forEach((enrollment) => {
      const courseId = enrollment.course.course_id;
      if (!uniqueCourses.has(courseId)) {
        uniqueCourses.set(courseId, enrollment.course);
      }
    });

    return Array.from(uniqueCourses.values());
  }

  async searchCourses(query: string, page: number = 1, limit: number = 10): Promise<{
    courses: Course[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.db.course.findMany({
        where: {
          OR: [
            { course_name: { contains: query, mode: 'insensitive' } },
            { course_description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        include: { category: true, learning_objectives: true, modules: true },
        orderBy: { created_at: 'desc' },
      }),
      this.db.course.count({
        where: {
          OR: [
            { course_name: { contains: query, mode: 'insensitive' } },
            { course_description: { contains: query, mode: 'insensitive' } },
            { language: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return { courses, total, totalPages: Math.ceil(total / limit) };
  }

  async getPricingForCourseAcrossCountries(courseId: string) {
    return this.db.coursePricing.findMany({
      where: { course_id: courseId, is_active: true },
      select: {
        pricing_id: true,
        country_id: true,
        course_id: true,
        category_id: true,
        base_price: true,
        discounted_price: true,
        current_price: true,
        currency: true,
        discount_percentage: true,
        tax_rate: true,
        price_factor: true,
        effective_from: true,
        effective_until: true,
        is_active: true,
        created_by: true,
        created_at: true,
        updated_at: true,
        country: {
          select: {
            country_id: true,
            country_name: true,
            country_code: true,
            iso_code: true,
            currency: true,
            zone_id: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
      orderBy: { effective_from: 'desc' },
    });
  }

  async getModulesWithChapters(courseId: string) {
    // Returns all modules for the given course with their chapters
    return this.db.module.findMany({
      where: { course_id: courseId },
      orderBy: { created_at: 'asc' },
      include: {
        chapters: {
          orderBy: { created_at: 'asc' },
        },
      },
    });
  }

  async getTopSellingCoursesByCountry(countryName: string, limit: number = 5) {
    // First, get the country_id from country_name
    const country = await this.db.country.findFirst({
      where: {
        country_name: {
          equals: countryName,
          mode: 'insensitive',
        },
      },
    });

    if (!country) {
      throw new Error(`Country '${countryName}' not found`);
    }

    // Get courses with highest sales for a specific country
    const topCourses = await this.db.payment.groupBy({
      by: ['course_id'],
      where: {
        status: 'Paid',
        course_id: { not: null },
      },
      _count: {
        payment_ID: true,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _count: {
          payment_ID: 'desc',
        },
      },
      take: limit,
    });

    // Fetch full course details with country-specific pricing
    const coursesWithDetails = await Promise.all(
      topCourses.map(async (item) => {
        if (!item.course_id) return null;
        
        const course = await this.db.course.findUnique({
          where: { course_id: item.course_id },
          include: {
            category: true,
            learning_objectives: true,
            teachers: true,
          },
        });

        if (!course) return null;

        // Get country-specific pricing with full details
        const pricing = await this.db.coursePricing.findFirst({
          where: {
            course_id: item.course_id,
            country_id: country.country_id,
            is_active: true,
          },
          include: {
            country: true,
          },
          orderBy: {
            effective_from: 'desc',
          },
        });

        return {
          ...course,
          salesCount: item._count.payment_ID,
          totalRevenue: item._sum.amount || 0,
          coursePricing: pricing || null,
        };
      })
    );

    return coursesWithDetails.filter((course) => course !== null);
  }

  async getLowestSellingCoursesByCountry(countryName: string, limit: number = 5) {
    // First, get the country_id from country_name
    const country = await this.db.country.findFirst({
      where: {
        country_name: {
          equals: countryName,
          mode: 'insensitive',
        },
      },
    });

    if (!country) {
      throw new Error(`Country '${countryName}' not found`);
    }

    // Get all courses with their sales count
    const allCoursesWithSales = await this.db.payment.groupBy({
      by: ['course_id'],
      where: {
        status: 'Paid',
        course_id: { not: null },
      },
      _count: {
        payment_ID: true,
      },
      _sum: {
        amount: true,
      },
    });

    // Get all active courses
    const allCourses = await this.db.course.findMany({
      select: {
        course_id: true,
      },
    });

    // Create a map of course sales
    const salesMap = new Map(
      allCoursesWithSales.map((item) => [
        item.course_id!,
        {
          count: item._count.payment_ID,
          revenue: item._sum.amount || 0,
        },
      ])
    );

    // Add courses with zero sales
    const coursesWithSalesData = allCourses.map((course) => ({
      course_id: course.course_id,
      salesCount: salesMap.get(course.course_id)?.count || 0,
      totalRevenue: salesMap.get(course.course_id)?.revenue || 0,
    }));

    // Sort by sales count ascending and take the lowest
    const lowestCourses = coursesWithSalesData
      .sort((a, b) => a.salesCount - b.salesCount)
      .slice(0, limit);

    // Fetch full course details with country-specific pricing
    const coursesWithDetails = await Promise.all(
      lowestCourses.map(async (item) => {
        const course = await this.db.course.findUnique({
          where: { course_id: item.course_id },
          include: {
            category: true,
            learning_objectives: true,
            teachers: true,
          },
        });

        if (!course) return null;

        // Get country-specific pricing with full details
        const pricing = await this.db.coursePricing.findFirst({
          where: {
            course_id: item.course_id,
            country_id: country.country_id,
            is_active: true,
          },
          include: {
            country: true,
          },
          orderBy: {
            effective_from: 'desc',
          },
        });

        return {
          ...course,
          salesCount: item.salesCount,
          totalRevenue: item.totalRevenue,
          coursePricing: pricing || null,
        };
      })
    );

    return coursesWithDetails.filter((course) => course !== null);
  }
}
