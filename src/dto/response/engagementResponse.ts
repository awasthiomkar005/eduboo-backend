export interface EngagementResponse {
  engagement_id: string;
  session_id: string;
  user_id: string;
  participation_level: number;
  interaction_score: number;
  questions_asked: number;
  questions_answered: number;
  time_on_task: number;
  created_at: Date;
  updated_at: Date;
}
