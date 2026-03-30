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
let orders = [];
let orderItems = [];
exports.orderService = {
    createOrder: (orderData, items) => __awaiter(void 0, void 0, void 0, function* () {
        const newOrder = {
            order_id: orders.length + 1,
            user_id: orderData.user_id,
            total_price: orderData.total_price || 0,
            status: 'pending',
            created_at: new Date()
        };
        orders.push(newOrder);
        // Map items to this order
        const newItems = items.map((item, index) => (Object.assign(Object.assign({}, item), { order_item_id: orderItems.length + index + 1, order_id: newOrder.order_id })));
        orderItems.push(...newItems);
        return { order: newOrder, items: newItems };
    }),
    getOrderById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const order = orders.find(o => o.order_id === id);
        const items = orderItems.filter(oi => oi.order_id === id);
        return order ? Object.assign(Object.assign({}, order), { items }) : null;
    })
};
