import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard';

const router = Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get admin dashboard metrics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 revenue:
 *                   type: number
 *                 totalGuests:
 *                   type: number
 *                 totalOrders:
 *                   type: number
 *                 cancelled:
 *                   type: number
 *                 todaysSchedule:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', dashboardController.getDashboard);

export default router;
