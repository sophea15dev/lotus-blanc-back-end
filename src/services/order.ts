import { Order, OrderItem } from '../models/order';

// Simulated Database
let orders: Order[] = [];
let orderItems: OrderItem[] = [];

export const orderService = {
    create: async (userId: number, items: OrderItem[]): Promise<Order> => {
        // 1. Logic: Calculate Total Price from all items
        const calculatedTotal = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // 2. Logic: Create the Order Header
        const newOrder: Order = {
            order_id: orders.length + 1,
            user_id: userId,
            total_price: calculatedTotal,
            status: 'pending',
            created_at: new Date()
        };

        // 3. Logic: Map Items to the new Order ID and save them
        const processedItems = items.map((item, index) => ({
            ...item,
            order_item_id: orderItems.length + index + 1,
            order_id: newOrder.order_id
        }));

        orders.push(newOrder);
        orderItems.push(...processedItems);

        // Return the Order with its items nested
        return { ...newOrder, items: processedItems };
    },

    getAll: async () => orders,

    getById: async (id: number) => {
        const order = orders.find(o => o.order_id === id);
        if (!order) return null;

        // Logic: Fetch associated items for this specific order
        const items = orderItems.filter(oi => oi.order_id === id);
        return { ...order, items };
    },

    update: async (id: number, updateData: Partial<Order>) => {
        const orderIndex = orders.findIndex(o => o.order_id === id);
        if (orderIndex === -1) return null;

        orders[orderIndex] = { ...orders[orderIndex], ...updateData };
        return orders[orderIndex];
    },

    delete: async (id: number) => {
        const orderIndex = orders.findIndex(o => o.order_id === id);
        if (orderIndex === -1) return false;

        // Also delete associated order items
        orderItems = orderItems.filter(oi => oi.order_id !== id);
        orders.splice(orderIndex, 1);
        return true;
    }
};