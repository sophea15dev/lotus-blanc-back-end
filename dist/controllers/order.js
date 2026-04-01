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
exports.orderController = void 0;
const order_1 = require("../services/order");
exports.orderController = {
    store: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user_id, items } = req.body;
            // Validation Logic
            if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Invalid order data. user_id and items array are required." });
            }
            const result = yield order_1.orderService.create(user_id, items);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield order_1.orderService.getAll();
        res.json(data);
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield order_1.orderService.getById(Number(req.params.id));
        data ? res.json(data) : res.status(404).json({ message: "Order not found" });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const result = yield order_1.orderService.update(Number(id), updateData);
            if (!result) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted = yield order_1.orderService.delete(Number(id));
            if (!deleted) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.json({ message: "Order deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
};
