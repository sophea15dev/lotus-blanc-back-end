export interface Reservation {
    reservation_id: number;
    user_id: number;
    adults: number;
    children: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    occasion: string;
    instruction: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}