import { Course, User } from "@prisma/client";

export interface StudentPerformanceMetricsResponseDTO {
  metrics_id: string;
  profile_id: string;
  user_id: string;
  course_id?: string;
  total_quizzes_attempted: number;
  total_assignments_completed: number;
  average_quiz_score: number;
  average_assignment_score: number;
  attendance_rate: number;
  engagement_score: number;
  improvement_percentage: number;
  total_study_hours: number;
  current_streak: number;
  longest_streak: number;
  period_start: Date;
  period_end: Date;
  created_at: Date;
  updated_at: Date;

  // Include related models
  course?: Pick<Course, "course_id" | "course_name" | "course_description" | "course_image" | "difficulty" | "language">;
  user?: Pick<User, "user_id" | "full_name" | "email">;
}
