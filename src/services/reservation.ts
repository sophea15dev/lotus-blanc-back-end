import { Reservation } from '../models/reservation';

// Mock DB - In a real app, this would be a SQL/NoSQL database call
let reservations: Reservation[] = [];

export const reservationService = {
    // Logic to create a new record
    create: async (data: Partial<Reservation>): Promise<Reservation> => {
        const newRes: Reservation = {
            reservation_id: reservations.length + 1,
            user_id: data.user_id!,
            date: data.date!,
            time: data.time!,
            number_of_guests: data.number_of_guests!,
            occasion: data.occasion || false,
            note: data.note || "",
            status: 'pending' 
        };
        
        reservations.push(newRes);
        return newRes;
    },

    // Logic to fetch all records
    findAll: async (): Promise<Reservation[]> => {
        return reservations;
    }
};