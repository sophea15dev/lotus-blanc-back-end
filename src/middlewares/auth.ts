// src/middlewares/authenticateAdmin.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AdminRequest extends Request {
  admin?: any;
}

export const authenticateAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Token format invalid" });
    }

    const token = parts[1];
    const secret = process.env.JWT_SECRET || 'lotus_blanc_secret_2026';

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err: any) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded.role || decoded.role !== 'admin') {
      return res.status(403).json({ message: "Admin role required" });
    }

    req.admin = decoded;
    next();
  } catch (err: any) {
    console.error('Authentication error:', err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};