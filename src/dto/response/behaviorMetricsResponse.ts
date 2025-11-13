export interface BehaviorMetricsResponse {
  behavior_id: string;
  user_id: string;
  course_id: string;
  session_id?: string;
  focus_score: number;
  collaboration_score: number;
  time_management_score: number;
  notes?: string;
  recorded_at: string;
  created_at: string;
}
