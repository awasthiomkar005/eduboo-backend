

export interface CreateSkillAssessmentRequest {
  user_id: string;
  course_id: string;
  problem_solving?: number;
  speed?: number;
  accuracy?: number;
  analytical_thinking?: number;
  creativity?: number;
}

export interface UpdateSkillAssessmentRequest {
  problem_solving?: number;
  speed?: number;
  accuracy?: number;
  analytical_thinking?: number;
  creativity?: number;
}
