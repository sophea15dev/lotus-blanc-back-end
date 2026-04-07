export interface OrderItem {
    order_item_id?: number;
    order_id?: number;
    item_id: number;
    quantity: number;
    price: number;
}

export interface Order {
    order_id: number;
    user_id: number;
    total_price: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: Date;
    items?: OrderItem[]; // Virtual field to hold nested items
}