// src/routes/menu.routes.ts
import { Router } from 'express';
import {
  createMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
  toggleMenuAvailability,
} from '../controllers/menu';
import { authenticateAdmin } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

// Apply admin authentication to all routes
router.use(authenticateAdmin);

// Menu routes
router.post('/', upload.single('image'), createMenu);          // Create menu
router.get('/', getAllMenus);                                  // Get all menus
router.put('/:id', upload.single('image'), updateMenu);       // Update menu
router.delete('/:id', deleteMenu);                             // Delete menu
router.patch('/:id/toggle', toggleMenuAvailability);          // Open/Close menu

export default router;