export interface CreateAttendanceRequest{
  session_id: string;
  profile_id: string;
  user_id: string;
  status: "attended" | "rescheduled" | "late_arrival" | "class_missed" | "no_show";
  arrival_time?: Date;
  leave_time?: Date;
  notes?: string;
}

export interface UpdateAttendanceRequest {
  status?: "attended" | "rescheduled" | "late_arrival" | "class_missed" | "no_show";
  arrival_time?: Date;
  leave_time?: Date;
  notes?: string;
}
