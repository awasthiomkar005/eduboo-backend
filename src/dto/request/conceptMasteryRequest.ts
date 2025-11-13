export interface CreateConceptMasteryRequest {
  user_id: string;
  course_id: string;
  skill_name: string;
  score: number;
  strength?: "needs_improvement" | "average" | "strong";
  last_tested?: string;
}

export interface UpdateConceptMasteryRequest {
  skill_name?: string;
  score?: number;
  strength?: "needs_improvement" | "average" | "strong";
  last_tested?: string;
}
