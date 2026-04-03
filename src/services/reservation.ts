import { Reservation } from "../models/reservation";

// Mock DB
let reservations: Reservation[] = [];

export const reservationService = {
  // Fix: Added phone to the create method
  create: async (data: Partial<Reservation>): Promise<Reservation> => {
    const newRes: Reservation = {
      reservation_id: reservations.length + 1,
      user_id: data.user_id!,
      phone: (data as any).phone || (data as any).phone_number || "N/A",
      adults: Number(data.adults) || 0,
      children: Number(data.children) || 0,
      date: data.date!,
      time: data.time!,
      occasion: data.occasion || "Standard",
      instruction: data.instruction || "None",
      status: "pending",
    };

    reservations.push(newRes);
    return newRes;
  },

  findAll: async (): Promise<Reservation[]> => {
    return reservations;
  },

  // Fix: Restore missing findById for your Controller
  findById: async (id: number): Promise<Reservation | null> => {
    const res = reservations.find((r) => r.reservation_id === id);
    return res || null;
  },

  // Fix: Restore missing update for status changes
  update: async (
    id: number,
    data: Partial<Reservation>,
  ): Promise<Reservation | null> => {
    const index = reservations.findIndex((r) => r.reservation_id === id);
    if (index === -1) return null;

    reservations[index] = { ...reservations[index], ...data };
    return reservations[index];
  },

  // Fix: Restore missing delete method
  delete: async (id: number): Promise<boolean> => {
    const index = reservations.findIndex((r) => r.reservation_id === id);
    if (index === -1) return false;

    reservations.splice(index, 1);
    return true;
  },
};
