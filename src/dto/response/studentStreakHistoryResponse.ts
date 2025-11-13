// Response DTOs
export interface StreakHistoryResponse {
  streak_id: string;
  profile_id: string;
  date: string;
  exp_earned?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}