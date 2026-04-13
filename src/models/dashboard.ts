import { Order } from "./order";
import { Reservation } from "./reservation";

export interface TodaysScheduleItem {
  reservation_id: number;
  user_id: number;
  date: string;
  time: string;
  adults: number;
  children: number;
  guests: number;
  occasion: string;
  status: Reservation["status"];
  instruction: string;
}

export interface DashboardMetrics {
  revenue: number;
  totalGuests: number;
  totalOrders: number;
  cancelled: number;
  cancelledOrders: number;
  cancelledReservations: number;
  todaysSchedule: TodaysScheduleItem[];
}

/**
 * Build dashboard metrics from in-memory orders and reservations.
 */
export const buildDashboardMetrics = (
  orders: Order[],
  reservations: Reservation[],
): DashboardMetrics => {
  const revenue = orders.reduce((sum, order) => sum + order.total_price, 0);
  const totalGuests = reservations.reduce(
    (sum, reservation) => sum + reservation.adults + reservation.children,
    0,
  );
  const totalOrders = orders.length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled",
  ).length;
  const cancelledReservations = reservations.filter(
    (res) => res.status === "cancelled",
  ).length;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const todaysSchedule: TodaysScheduleItem[] = reservations
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
};
