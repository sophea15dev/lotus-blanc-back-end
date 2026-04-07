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

router.use(authenticateAdmin);

router.post('/', upload.single('image'), createMenu);
router.get('/', getAllMenus);
router.put('/:id', upload.single('image'), updateMenu);
router.delete('/:id', deleteMenu);
router.patch('/:id/toggle', toggleMenuAvailability);   // ← Open / Close button

export default router;