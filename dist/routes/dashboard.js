"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../controllers/dashboard");
const router = (0, express_1.Router)();
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
router.get('/', dashboard_1.dashboardController.getDashboard);
exports.default = router;
