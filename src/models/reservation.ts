export interface Reservation {
    reservation_id: number;
    user_id: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    number_of_guests: number;
    occasion: boolean;
    note?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}