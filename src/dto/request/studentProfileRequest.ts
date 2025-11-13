export interface CreateStudentProfileRequest {
  user_id: string;
  grade?: string;
  location?: string;
  total_exp?: number;
  current_level?: number;
  exp_to_next_level?: number;
  day_streak?: number;
  best_subject?: string;
}

export interface UpdateStudentProfileRequest {
  grade?: string;
  location?: string;
  total_exp?: number;
  current_level?: number;
  exp_to_next_level?: number;
  day_streak?: number;
  best_subject?: string;
}
