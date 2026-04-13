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
exports.orderService = void 0;
// Simulated Database
let orders = [];
let orderItems = [];
exports.orderService = {
    create: (userId, items) => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Logic: Calculate Total Price from all items
        const calculatedTotal = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        // 2. Logic: Create the Order Header
        const newOrder = {
            order_id: orders.length + 1,
            user_id: userId,
            total_price: calculatedTotal,
            status: 'pending',
            created_at: new Date()
        };
        // 3. Logic: Map Items to the new Order ID and save them
        const processedItems = items.map((item, index) => (Object.assign(Object.assign({}, item), { order_item_id: orderItems.length + index + 1, order_id: newOrder.order_id })));
        orders.push(newOrder);
        orderItems.push(...processedItems);
        // Return the Order with its items nested
        return Object.assign(Object.assign({}, newOrder), { items: processedItems });
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () { return orders; }),
    getById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const order = orders.find(o => o.order_id === id);
        if (!order)
            return null;
        // Logic: Fetch associated items for this specific order
        const items = orderItems.filter(oi => oi.order_id === id);
        return Object.assign(Object.assign({}, order), { items });
    }),
    update: (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const orderIndex = orders.findIndex(o => o.order_id === id);
        if (orderIndex === -1)
            return null;
        orders[orderIndex] = Object.assign(Object.assign({}, orders[orderIndex]), updateData);
        return orders[orderIndex];
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const orderIndex = orders.findIndex(o => o.order_id === id);
        if (orderIndex === -1)
            return false;
        // Also delete associated order items
        orderItems = orderItems.filter(oi => oi.order_id !== id);
        orders.splice(orderIndex, 1);
        return true;
    })
};
