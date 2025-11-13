export interface AttendanceResponse {
  attendance_id: string;
  session_id: string;
  profile_id: string;
  user_id: string;
  status: string;
  arrival_time?: Date;
  leave_time?: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
