import { Request, Response } from 'express';
import { adminService } from '../services/admin';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const result = await adminService.login(email, password);

        if (!result) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
            ...result
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
};