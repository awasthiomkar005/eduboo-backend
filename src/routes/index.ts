import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import courseRoutes from './courseRoutes';
import moduleRoutes from './moduleRoutes';
import chapterRoutes from './chapterRoute';
import feedbackRoutes from './feedbackRoutes';
import assignmentRoutes from './assignmentRoutes';
import homeworkRoutes from './homeworkRoutes';
import quizzRoutes from './quizzRoutes';
import questionRoutes from './questionRoutes';
// Import other existing routes
// import dashboardRoutes from './dashboard';
import submissionRoutes from './submissionRoutes';
import slotRoutes from './slotRoutes';
import answerRoutes from './answerRoutes';
import quizzAttemptRoutes from './quizzAttemptRoutes';
import countryRoutes from './countryRoutes';
import razorpayRoutes from './razorpayPayment';
import merithubRoutes from './merithubRoutes';
import wherebyRoutes from './wherebyRoutes';
import geoRoutes from "./geoRoutes";
import dashboardRoutes from './dashboardRoutes'
import dyteRoutes from './dyte'
import teacherRoutes from './sessionRoutes'
import adminRoutes from './adminRoutes'
import zoneRoutes from './zoneRoutes'
import  coursePricingRoutes from  './coursePricingRoutes'
import regionalConfigRoutes from './regionalConfigRoutes'
import assignTeacherRoutes from './assignTeacherRoutes';
import LearningObjectiveRoutes from './learningObjectiveRoutes';
import studentHomeworkRoutes from './studentHomeworkRoutes';
import studentAssignmentRoutes from './studentAssignmentRoutes';
import studentProfileRoutes from './studentProfileRoutes'
import studentStreakHistoryRoutes from './studentStreakHistoryRoutes'
import topicProgressRoutes from './topicProgressRoutes'
import conceptMasteryRoutes from './conceptMasteryRoutes'
import skillAssessmentRoutes from './skillAssessmentRoutes'
import testPerformanceRoutes from './testPerformanceRoutes'
import homeworkMetricsRoutes from './homeworkMetricsRoutes'
import behaviourMetricsRoutes from './behaviorMetricsRoutes'
import engagementRoutes from './engagementRoutes'
import attendanceRoutes from './attendanceRoutes'
import  studentPerformanceMetricsRoutes  from './studentPerformanceMetricsRoutes'
 

const router = Router();

// API Routes - Clean Architecture
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/chapters', chapterRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/homeworks', homeworkRoutes);
router.use('/quizzes', quizzRoutes);
router.use('/questions', questionRoutes);

// Legacy routes (keeping existing structure for now)
// router.use('/dashboard', dashboardRoutes);
router.use('/submissions', submissionRoutes);
router.use('/slot', slotRoutes);
router.use('/answers', answerRoutes);
router.use('/quiz-attempts', quizzAttemptRoutes);
router.use('/country', countryRoutes);
router.use('/payment', razorpayRoutes);
router.use('/merithub', merithubRoutes);
router.use('/whereby', wherebyRoutes);
router.use("/geo", geoRoutes);
router.use('/dyte', dyteRoutes);

router.use('/dashboard', dashboardRoutes)
router.use('/teacher', teacherRoutes)
router.use('/zone',zoneRoutes)
router.use('/coursePricing',coursePricingRoutes)
router.use('/regional-config',regionalConfigRoutes)
router.use('/admin', adminRoutes)
router.use('/assignTeacher',assignTeacherRoutes)
router.use('/learingObjective',LearningObjectiveRoutes);
router.use('/', studentHomeworkRoutes);
router.use('/', studentAssignmentRoutes);
router.use('/studentProfile',studentProfileRoutes)
router.use('/studentStreakHistory',studentStreakHistoryRoutes)
router.use('/topicProgress',topicProgressRoutes)
router.use('/conceptMastery',conceptMasteryRoutes)
router.use('/skillAssessment',skillAssessmentRoutes)
router.use('/testPerformance',testPerformanceRoutes)
router.use('/homeworkMetrics',homeworkMetricsRoutes)
router.use('/behaviourMetrics',behaviourMetricsRoutes)
router.use('/engagement',engagementRoutes)
router.use('/attendance',attendanceRoutes)
router.use('/studentPerformanceMetrics',studentPerformanceMetricsRoutes)


export default router;
