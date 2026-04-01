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
 *     responses:
 *       200:
 *         description: Dashboard metrics
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', dashboardController.getDashboard);

export default router;
