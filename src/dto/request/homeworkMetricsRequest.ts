export interface HomeworkMetricsRequest {
  user_id: string;
  course_id: string;
  week_number?: number;
  month?: number;
  year: number;
  total_assigned?: number;
  total_submitted?: number;
  on_time_submissions?: number;
  late_submissions?: number;
  study_hours?: number;
}
