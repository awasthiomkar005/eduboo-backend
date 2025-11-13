export interface StudentProfileResponse {
  profile_id: string;
  user_id: string;
  grade: string | null;
  location: string | null;
  joining_date: string | null;
  total_exp: number;
  current_level: number;
  exp_to_next_level: number;
  day_streak: number;
  best_subject: string | null;
  last_activity: string | null;
  created_at: string | null;
  updated_at: string | null;
}
