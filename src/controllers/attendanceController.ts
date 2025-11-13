import { Request, Response } from "express";
import { AttendanceService } from "../services/attendanceService";


const attendanceService = new AttendanceService();

export class AttendanceController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const attendance = await attendanceService.create(data);
      return res.status(201).json({
        success: true,
        message: "Attendance record created successfully",
        data: attendance,
      });
    } catch (error: any) {
      console.error("Error creating attendance:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create attendance record",
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await attendanceService.getAll(page, limit);

      return res.status(200).json({
        success: true,
        message: "Attendance records fetched successfully",
        data: result.records,
        pagination: result.pagination,
      });
    } catch (error: any) {
      console.error("Error fetching attendances:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch attendance records",
        error: error.message,
      });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await attendanceService.getByUser(user_id, page, limit);

      return res.status(200).json({
        success: true,
        message: "Attendance records fetched successfully for user",
        data: result.records,
        pagination: result.pagination,
      });
    } catch (error: any) {
      console.error("Error fetching attendance by user:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch user attendance",
        error: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { attendance_id } = req.params;
      const attendance = await attendanceService.getById(attendance_id);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "Attendance record not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Attendance record fetched successfully",
        data: attendance,
      });
    } catch (error: any) {
      console.error("Error fetching attendance:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch attendance record",
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { attendance_id } = req.params;
      const data = req.body;

      const updatedAttendance = await attendanceService.update(attendance_id, data);

      return res.status(200).json({
        success: true,
        message: "Attendance record updated successfully",
        data: updatedAttendance,
      });
    } catch (error: any) {
      console.error("Error updating attendance:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update attendance record",
        error: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { attendance_id } = req.params;
      await attendanceService.delete(attendance_id);

      return res.status(200).json({
        success: true,
        message: "Attendance record deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting attendance:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete attendance record",
        error: error.message,
      });
    }
  }
}

