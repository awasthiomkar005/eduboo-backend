export interface CreateBehaviorMetricsRequest {
  user_id: string;
  course_id: string;
  session_id?: string;
  focus_score?: number;
  collaboration_score?: number;
  time_management_score?: number;
  notes?: string;
  recorded_at?: string;
}

export interface UpdateBehaviorMetricsRequest {
  focus_score?: number;
  collaboration_score?: number;
  time_management_score?: number;
  notes?: string;
  recorded_at?: string;
}
