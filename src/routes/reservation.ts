import { Router } from 'express';
import { createReservation, getAllReservations } from '../controllers/reservation';

const router = Router();

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllReservations);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               guests:
 *                 type: integer
 *               table:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created
 */
router.post('/', createReservation);

export default router;