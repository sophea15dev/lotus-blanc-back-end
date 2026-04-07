import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lotus_blanc_secret_2026') as any;

        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Admin role required' });
        }

        (req as any).admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized access" });
    }
};