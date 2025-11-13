export interface TestPerformanceResponse {
  test_performance_id: string;
  user_id: string;
  course_id: string;
  quiz_attempt_id: string | null;
  test_name: string;
  score: number;
  max_score: number;
  percentage: number;
  time_taken: number | null;
  test_date: string;
  created_at: string;
}
