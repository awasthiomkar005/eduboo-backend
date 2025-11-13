import { Request, Response } from 'express';
import { StudentProfileService } from '../services/studentProfileService';
import { CreateStudentProfileRequest, UpdateStudentProfileRequest } from '../dto/request/studentProfileRequest';

export class StudentProfileController {
  private service = new StudentProfileService();

  createStudentProfile = async (req: Request, res: Response) => {
    try {
      const data: CreateStudentProfileRequest = req.body;
      const profile = await this.service.createStudentProfile(data);
      res.status(201).json({ success: true, message: 'Student profile created successfully', data: profile });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getStudentProfiles = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.service.getStudentProfiles(page, limit);
      res.status(200).json({ success: true, message: 'Profiles fetched successfully', data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getStudentProfileById = async (req: Request, res: Response) => {
    try {
      const { profile_id } = req.params;
      const profile = await this.service.getStudentProfileById(profile_id);
      if (!profile) {
        return res.status(404).json({ success: false, message: 'Student profile not found' });
      }
      res.status(200).json({ success: true, data: profile });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  updateStudentProfile = async (req: Request, res: Response) => {
    try {
      const { profile_id } = req.params;
      const data: UpdateStudentProfileRequest = req.body;
      const profile = await this.service.updateStudentProfile(profile_id, data);
      res.status(200).json({ success: true, message: 'Student profile updated successfully', data: profile });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  deleteStudentProfile = async (req: Request, res: Response) => {
    try {
      const { profile_id } = req.params;
      await this.service.deleteStudentProfile(profile_id);
      res.status(200).json({ success: true, message: 'Student profile deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
