export interface UpcomingClassResponse {
  session_id: string;
  channel_name?: string;
  schedule_at: Date;
  status: string;
  class_type: string;
  session_type: string;
  course: {
    course_id: string;
    course_name: string;
    course_image?: string;
    difficulty: string;
    category: {
      category_id: string;
      category_name: string;
    };
  };
  teacher: {
    teacher_id: string;
    user: {
      full_name: string;
      email: string;
    };
  };
  module?: {
    module_id: string;
    module_title: string;
    duration: number;
  };
  chapter?: {
    chapter_id: string;
    chapter_name: string;
  };
  slot?: {
    slot_id: number;
    slot_date: Date;
    start_time: Date;
    end_time: Date;
    capacity: number;
  };
  whereby_room_url?: string;
  dyte_session_id?: string;
  teacher_join_url?: string;
  student_join_url?: string;
}

export interface UpcomingClassesListResponse {
  sessions: UpcomingClassResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
  pagesLeft: number;
  totalItemsLeft: number;
}
