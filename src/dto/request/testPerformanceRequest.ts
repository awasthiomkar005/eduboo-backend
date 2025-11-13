export interface CreateTestPerformanceRequest {
  user_id: string;
  course_id: string;
  quiz_attempt_id?: string | null;
  test_name: string;
  score: number;
  max_score: number;
  percentage: number;
  time_taken?: number | null;
  test_date: string; // ISO string
}

export interface UpdateTestPerformanceRequest {
  user_id?: string;
  course_id?: string;
  quiz_attempt_id?: string | null;
  test_name?: string;
  score?: number;
  max_score?: number;
  percentage?: number;
  time_taken?: number | null;
  test_date?: string; // ISO string
}

