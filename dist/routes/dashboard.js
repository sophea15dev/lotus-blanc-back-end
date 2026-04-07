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
 *     responses:
 *       200:
 *         description: Dashboard metrics
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', dashboard_1.dashboardController.getDashboard);
exports.default = router;
