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
exports.dashboardService = void 0;
const order_1 = require("./order");
const reservation_1 = require("./reservation");
exports.dashboardService = {
    getMetrics: () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield order_1.orderService.getAll();
        const reservations = yield reservation_1.reservationService.findAll();
        const revenue = orders.reduce((sum, order) => sum + order.total_price, 0);
        const totalGuests = reservations.reduce((sum, reservation) => sum + reservation.adults + reservation.children, 0);
        const totalOrders = orders.length;
        const cancelledOrders = orders.filter((order) => order.status === 'cancelled').length;
        const cancelledReservations = reservations.filter((res) => res.status === 'cancelled').length;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayKey = `${yyyy}-${mm}-${dd}`;
        const todaysSchedule = reservations
            .filter((reservation) => reservation.date === todayKey)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((reservation) => ({
            reservation_id: reservation.reservation_id,
            user_id: reservation.user_id,
            date: reservation.date,
            time: reservation.time,
            adults: reservation.adults,
            children: reservation.children,
            guests: reservation.adults + reservation.children,
            occasion: reservation.occasion,
            status: reservation.status,
            instruction: reservation.instruction,
        }));
        return {
            revenue,
            totalGuests,
            totalOrders,
            cancelled: cancelledOrders + cancelledReservations,
            cancelledOrders,
            cancelledReservations,
            todaysSchedule,
        };
    }),
};
