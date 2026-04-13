import { Request, Response } from 'express';
import { orderService } from '../services/order';

export const orderController = {
    store: async (req: Request, res: Response) => {
        try {
            const { user_id, items } = req.body;

            // Validation Logic
            if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Invalid order data. user_id and items array are required." });
            }

            const result = await orderService.create(user_id, items);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    index: async (req: Request, res: Response) => {
        const data = await orderService.getAll();
        res.json(data);
    },

    show: async (req: Request, res: Response) => {
        const data = await orderService.getById(Number(req.params.id));
        data ? res.json(data) : res.status(404).json({ message: "Order not found" });
    },

    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const result = await orderService.update(Number(id), updateData);
            if (!result) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    destroy: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = await orderService.delete(Number(id));

            if (!deleted) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};