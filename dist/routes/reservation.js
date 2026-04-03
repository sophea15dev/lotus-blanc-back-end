"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationService = void 0;
const express_1 = require("express");
const reservation_1 = require("../controllers/reservation");
const router = (0, express_1.Router)();
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
router.get("/", reservation_1.getAllReservations);
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
router.post("/", reservation_1.createReservation);
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
router.get("/:id", reservation_1.getReservationById);
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
router.put("/:id", reservation_1.updateReservation);
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
router.delete("/:id", reservation_1.deleteReservation);
exports.default = router;
// Mock DB - In a real app, this would be a SQL/NoSQL database call
let reservations = [];
exports.reservationService = {
    // Logic to create a new record
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newRes = {
            reservation_id: reservations.length + 1,
            user_id: data.user_id,
            adults: data.adults,
            children: data.children,
            date: data.date,
            time: data.time,
            occasion: data.occasion,
            instruction: data.instruction,
            status: "pending",
        };
        reservations.push(newRes);
        return newRes;
    }),
    // Logic to fetch all records
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return reservations;
    }),
    // Logic to find a record by ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const reservation = reservations.find((res) => res.reservation_id === id);
        return reservation || null;
    }),
    // Logic to update a record
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const index = reservations.findIndex((res) => res.reservation_id === id);
        if (index === -1)
            return null;
        reservations[index] = Object.assign(Object.assign({}, reservations[index]), data);
        return reservations[index];
    }),
    // Logic to delete a record
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const index = reservations.findIndex((res) => res.reservation_id === id);
        if (index === -1)
            return false;
        reservations.splice(index, 1);
        return true;
    }),
};
