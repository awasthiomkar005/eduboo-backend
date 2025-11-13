export interface CreatePerformanceRequest {
  profile_id: string;
  user_id: string;
  course_id?: string;
  total_quizzes_attempted?: number;
  total_assignments_completed?: number;
  average_quiz_score?: number;
  average_assignment_score?: number;
  attendance_rate?: number;
  engagement_score?: number;
  improvement_percentage?: number;
  total_study_hours?: number;
  current_streak?: number;
  longest_streak?: number;
  period_start: string;
  period_end: string;
}

export interface UpdatePerformanceRequest {
  total_quizzes_attempted?: number;
  total_assignments_completed?: number;
  average_quiz_score?: number;
  average_assignment_score?: number;
  attendance_rate?: number;
  engagement_score?: number;
  improvement_percentage?: number;
  total_study_hours?: number;
  current_streak?: number;
  longest_streak?: number;
  period_start?: string;
  period_end?: string;
}
