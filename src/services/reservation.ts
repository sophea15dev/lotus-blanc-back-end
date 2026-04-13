import { Reservation } from '../models/reservation';

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
            status: 'pending'
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
        const reservation = reservations.find(res => res.reservation_id === id);
        return reservation || null;
    },

    // Logic to update a record
    update: async (id: number, data: Partial<Reservation>): Promise<Reservation | null> => {
        const index = reservations.findIndex(res => res.reservation_id === id);
        if (index === -1) return null;

        reservations[index] = {
            ...reservations[index],
            ...data
        };
        return reservations[index];
    },

    // Logic to delete a record
    delete: async (id: number): Promise<boolean> => {
        const index = reservations.findIndex(res => res.reservation_id === id);
        if (index === -1) return false;

        reservations.splice(index, 1);
        return true;
    }
};