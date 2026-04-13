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
            status: 'pending'
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
        const reservation = reservations.find(res => res.reservation_id === id);
        return reservation || null;
    }),
    // Logic to update a record
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const index = reservations.findIndex(res => res.reservation_id === id);
        if (index === -1)
            return null;
        reservations[index] = Object.assign(Object.assign({}, reservations[index]), data);
        return reservations[index];
    }),
    // Logic to delete a record
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const index = reservations.findIndex(res => res.reservation_id === id);
        if (index === -1)
            return false;
        reservations.splice(index, 1);
        return true;
    })
};
