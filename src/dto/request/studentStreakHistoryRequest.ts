// Request DTOs
export interface CreateStreakHistoryRequest {
  profile_id: string;
  date: string;
  exp_earned?: number;
  is_active?: boolean;
}

export interface UpdateStreakHistoryRequest {
  date?: string;
  exp_earned?: number;
  is_active?: boolean;
}


