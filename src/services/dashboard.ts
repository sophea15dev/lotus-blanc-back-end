import { orderService } from "./order";
import { reservationService } from "./reservation";
import { buildDashboardMetrics, DashboardMetrics } from "../models/dashboard";

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const orders = await orderService.getAll();
    const reservations = await reservationService.findAll();

    return buildDashboardMetrics(orders, reservations);
  },
};
