import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard';

export const dashboardController = {
  getDashboard: async (_req: Request, res: Response) => {
    try {
      const data = await dashboardService.getMetrics();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Dashboard error', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
