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
exports.getOrder = exports.createOrder = void 0;
const order_1 = require("../services/order");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderData, items } = req.body;
        const result = yield order_1.orderService.createOrder(orderData, items);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const order = yield order_1.orderService.getOrderById(id);
    order ? res.json(order) : res.status(404).json({ message: "Order not found" });
});
exports.getOrder = getOrder;
