import { DyteRepository } from "../repositories/dyteRepository";
import { createRealtimeMeeting, addRealtimeParticipant } from "../lib/realtimekit";
import { Prisma } from "@prisma/client";

export class DyteClassService {
  private repo: DyteRepository;

  constructor() {
    this.repo = new DyteRepository();
  }

  /**
   * ✅ Starts a class meeting and generates tokens for teacher + students
   */
  async startClass(sessionId: string) {
    try {
      const session = await this.repo.getSessionWithParticipants(sessionId);
      if (!session) {
        return { status: 404, body: { message: "Session not found" } };
      }

      if (session.dyte_session_id) {
        return {
          status: 200,
          body: {
            success: true,
            message: "Dyte meeting already exists",
            data: {
              dyte_session_id: session.dyte_session_id,
              dyte_host_token: session.dyte_host_token,
              dyte_join_tokens: session.dyte_join_tokens as Record<string, string> | null,
            },
          },
        };
      }

      // ✅ Create a new meeting
      const meeting = await createRealtimeMeeting(`Class-${session.session_id}`);

      // ✅ Add teacher
      const teacherData = await addRealtimeParticipant(
        meeting.id,
        session.teacher_id,
        session.teacher.user.full_name,
        process.env.CF_TEACHER_PRESET || "group_call_host"
      );

      // ✅ Add all students
      const studentTokens: Record<string, string> = {};
      for (const enrollment of session.enrollments) {
        const student = enrollment.user;
        const studentData = await addRealtimeParticipant(
          meeting.id,
          student.user_id,
          student.full_name,
          process.env.CF_STUDENT_PRESET || "group_call_participant"
        );
        studentTokens[student.user_id] = studentData.token;
      }

      // ✅ Save session updates
      const updated = await this.repo.updateSessionDyteData(sessionId, {
        dyte_session_id: meeting.id,
        dyte_app_id: process.env.CF_ORG_ID || null,
        dyte_host_token: teacherData.token,
        dyte_join_tokens: studentTokens as unknown as Prisma.InputJsonValue,
      });

      return {
        status: 200,
        body: {
          success: true,
          message: "Dyte meeting created successfully",
          data: {
            meetingId: updated.dyte_session_id,
            teacherToken: updated.dyte_host_token,
            studentTokens: updated.dyte_join_tokens as Record<string, string> | null,
          },
        },
      };
    } catch (err: any) {
      console.error("❌ startClass error:", err.message);
      return { status: 500, body: { success: false, message: err.message } };
    }
  }

  /**
   * ✅ Handles joining logic for both teacher & student
   */
  async joinClass(sessionId: string, userId: string, role: "teacher" | "student") {
    try {
      const session = await this.repo.getSessionById(sessionId);
      if (!session) {
        return { status: 404, body: { message: "Session not found" } };
      }

      // 🧑‍🏫 TEACHER JOIN
      if (role === "teacher") {
        // If no meeting yet, start it and return fresh host token
        if (!session.dyte_session_id) {
          const startResult = await this.startClass(sessionId);
          if (startResult.status !== 200) return startResult;
          const refreshed = await this.repo.getSessionById(sessionId);
          if (!refreshed?.dyte_host_token) {
            return { status: 500, body: { message: "Failed to initialize meeting for teacher" } };
          }
          return { status: 200, body: { token: refreshed.dyte_host_token } };
        }
        // Meeting exists: always mint a fresh host token
        const teacherData = await addRealtimeParticipant(
          session.dyte_session_id,
          userId,
          "Teacher",
          process.env.CF_TEACHER_PRESET || "group_call_host"
        );
        await this.repo.updateSessionDyteData(sessionId, {
          dyte_host_token: teacherData.token,
        });

        return { status: 200, body: { token: teacherData.token } };
      }

      // 👨‍🎓 STUDENT JOIN
      const tokens = (session.dyte_join_tokens || {}) as Record<string, string>;
      const existingToken = tokens[userId];

      // If meeting not started yet
      if (!session.dyte_session_id) {
        return { status: 400, body: { message: "Meeting not started yet" } };
      }

      // Add participant for student
      const studentData = await addRealtimeParticipant(
        session.dyte_session_id,
        userId,
        "Student",
        process.env.CF_STUDENT_PRESET || "group_call_participant"
      );

      const updatedTokens = { ...tokens, [userId]: studentData.token };
      await this.repo.updateSessionDyteData(sessionId, {
        dyte_join_tokens: updatedTokens as unknown as Prisma.InputJsonValue,
      });

      return { status: 200, body: { token: studentData.token } };
    } catch (err: any) {
      console.error("❌ joinClass error:", err.message);
      return { status: 500, body: { success: false, message: err.message } };
    }
  }
}
