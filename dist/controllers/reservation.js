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
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getAllReservations = exports.createReservation = void 0;
const reservation_1 = require("../services/reservation");
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
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, adults, children, date, time, occasion, instruction } = req.body;
        // Validation Logic
        if (!user_id ||
            adults === undefined ||
            children === undefined ||
            !date ||
            !time ||
            !occasion ||
            !instruction) {
            return res
                .status(400)
                .json({
                error: "Please fill all required fields (adults, children, date, time, occasion, instruction).",
            });
        }
        const result = yield reservation_1.reservationService.create(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createReservation = createReservation;
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
const getAllReservations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield reservation_1.reservationService.findAll();
    res.status(200).json(data);
});
exports.getAllReservations = getAllReservations;
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
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation found
 *       404:
 *         description: Reservation not found
 */
const getReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield reservation_1.reservationService.findById(Number(id));
        if (!data) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getReservationById = getReservationById;
/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       404:
 *         description: Reservation not found
 *       400:
 *         description: Missing required fields
 */
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user_id, adults, children, date, time, occasion, instruction } = req.body;
        // Validation Logic
        if (!user_id ||
            adults === undefined ||
            children === undefined ||
            !date ||
            !time ||
            !occasion ||
            !instruction) {
            return res
                .status(400)
                .json({
                error: "Please fill all required fields (adults, children, date, time, occasion, instruction).",
            });
        }
        const result = yield reservation_1.reservationService.update(Number(id), req.body);
        if (!result) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateReservation = updateReservation;
/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 */
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield reservation_1.reservationService.delete(Number(id));
        if (!result) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteReservation = deleteReservation;
