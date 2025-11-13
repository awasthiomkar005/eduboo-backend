export interface TopicProgressResponse {
  progress_id: string;
  user_id: string;
  course_id: string;
  module_id: string;
  chapter_id?: string | null;
  topic_name: string;
  completion_status: number;
  mastery_level: "not_started" | "in_progress" | "completed" | "mastered";
  time_spent: number;
  last_accessed: string; // ISO
  created_at: string;
  updated_at: string;
}
