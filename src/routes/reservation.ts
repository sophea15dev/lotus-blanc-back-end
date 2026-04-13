import { Router } from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservation";

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
router.get("/", getAllReservations);

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
router.post("/", createReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation by ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", deleteReservation);

export default router;
import { Reservation } from "../models/reservation";

// Mock DB - In a real app, this would be a SQL/NoSQL database call
let reservations: Reservation[] = [];

export const reservationService = {
  // Logic to create a new record
  create: async (data: Partial<Reservation>): Promise<Reservation> => {
    const newRes: Reservation = {
      reservation_id: reservations.length + 1,
      user_id: data.user_id!,
      adults: data.adults!,
      children: data.children!,
      date: data.date!,
      time: data.time!,
      occasion: data.occasion!,
      instruction: data.instruction!,
      status: "pending",
    };

    reservations.push(newRes);
    return newRes;
  },

  // Logic to fetch all records
  findAll: async (): Promise<Reservation[]> => {
    return reservations;
  },

  // Logic to find a record by ID
  findById: async (id: number): Promise<Reservation | null> => {
    const reservation = reservations.find((res) => res.reservation_id === id);
    return reservation || null;
  },

  // Logic to update a record
  update: async (
    id: number,
    data: Partial<Reservation>,
  ): Promise<Reservation | null> => {
    const index = reservations.findIndex((res) => res.reservation_id === id);
    if (index === -1) return null;

    reservations[index] = {
      ...reservations[index],
      ...data,
    };
    return reservations[index];
  },

  // Logic to delete a record
  delete: async (id: number): Promise<boolean> => {
    const index = reservations.findIndex((res) => res.reservation_id === id);
    if (index === -1) return false;

    reservations.splice(index, 1);
    return true;
  },
};
