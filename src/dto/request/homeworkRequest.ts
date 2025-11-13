export interface CreateHomeworkRequest {
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

export interface UpdateHomeworkRequest {
  title?: string;
  description?: string;
  type?: 'QUIZ' | 'PUZZLE' | 'CODE_EXERCISE';
  language?: string;
  starter_code?: string;
  metadata?: any;
  reward_points?: number;
}

export interface HomeworkQueryParams {
  page?: number;
  limit?: number;
  course_id?: string;
  chapter_id?: string;
  type?: string;
  created_by?: string;
  search?: string;
}
