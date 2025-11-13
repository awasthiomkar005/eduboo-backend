export interface CreateEngagementRequest {
  session_id: string;
  user_id: string;
  participation_level?: number;
  interaction_score?: number;
  questions_asked?: number;
  questions_answered?: number;
  time_on_task?: number;
}

export interface UpdateEngagementRequest {
  participation_level?: number;
  interaction_score?: number;
  questions_asked?: number;
  questions_answered?: number;
  time_on_task?: number;
}
