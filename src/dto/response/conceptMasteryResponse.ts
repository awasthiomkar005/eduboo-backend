export interface ConceptMasteryResponse {
  concept_id: string;
  user_id: string;
  course_id: string;
  skill_name: string;
  score: number;
  strength: "needs_improvement" | "average" | "strong";
  last_tested: string;
  created_at: string;
  updated_at: string;
}
