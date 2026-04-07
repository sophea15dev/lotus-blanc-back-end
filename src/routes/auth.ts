import { Router } from "express";
import { adminLogin } from "../controllers/auth";

const router = Router();

/**
 * @swagger
 * /api/auth/admin-login:
 *   post:
 *     summary: Admin login
 *     description: Login only allowed for the admin account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@lotus.com
 *               password:
 *                 type: string
 *                 example: 123123
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Email and password required
 *       401:
 *         description: Invalid admin credentials
 */
router.post("/admin-login", adminLogin);

export default router;