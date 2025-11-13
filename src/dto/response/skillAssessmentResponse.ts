

export interface SkillAssessmentResponse {
  assessment_id: string;
  user_id: string;
  course_id: string;
  problem_solving: number;
  speed: number;
  accuracy: number;
  analytical_thinking: number;
  creativity: number;
  assessed_at: string | null;
  updated_at: string | null;
}
