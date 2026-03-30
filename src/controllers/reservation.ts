import { Request, Response } from 'express';
import { reservationService } from '../services/reservation';

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - user_id
 *         - adults
 *         - children
 *         - date
 *         - time
 *         - occasion
 *         - instruction
 *       properties:
 *         user_id:
 *           type: integer
 *         adults:
 *           type: integer
 *           example: 2
 *         children:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date
 *           example: "2026-03-27"
 *         time:
 *           type: string
 *           example: "19:00"
 *         occasion:
 *           type: string
 *           description: Occasion (e.g., birthday, anniversary)
 *         instruction:
 *           type: string
 *           description: Additional instructions for the reservation.
 */

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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Missing required fields
 */
export const createReservation = async (req: Request, res: Response) => {
    try {
        const { user_id, adults, children, date, time, occasion, instruction } = req.body;

        // Validation Logic
        if (
            !user_id ||
            adults === undefined ||
            children === undefined ||
            !date ||
            !time ||
            !occasion ||
            !instruction
        ) {
            return res.status(400).json({ error: "Please fill all required fields (adults, children, date, time, occasion, instruction)." });
        }

        const result = await reservationService.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of all reservations
 */
export const getAllReservations = async (_req: Request, res: Response) => {
    const data = await reservationService.findAll();
    res.status(200).json(data);
};