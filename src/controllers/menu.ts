// src/controllers/menu.controller.ts
import { Request, Response } from 'express';
import pool from '../config/db';

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management endpoints (Admin only)
 */

/**
 * @swagger
 * /api/admin/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - name
 *               - description
 *               - price
 *               - image
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Grilled Salmon"
 *               description:
 *                 type: string
 *                 example: "Fresh grilled salmon with lemon butter sauce"
 *               price:
 *                 type: number
 *                 example: 15.99
 *               is_available:
 *                 type: boolean
 *                 default: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu created successfully
 *       400:
 *         description: Missing required fields or invalid data
 *       409:
 *         description: Menu name already exists in this category
 */
export const createMenu = async (req: Request, res: Response) => {
  try {
    const { category_id, name, description, price, is_available = true } = req.body;

    if (!category_id || !name || !description || !price) {
      return res.status(400).json({ success: false, message: 'category_id, name, description and price are required' });
    }

    if (parseFloat(price) <= 0) {
      return res.status(400).json({ success: false, message: 'Price must be greater than 0' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const imagePath = req.file.path.replace(/\\/g, '/');

    // Check category exists
    const { rows: cat } = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (cat.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Check duplicate
    const { rows: existing } = await pool.query(
      'SELECT id FROM menus WHERE category_id = $1 AND LOWER(name) = LOWER($2)',
      [category_id, name]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: `Menu "${name}" already exists in this category` });
    }

    const { rows } = await pool.query(
      `INSERT INTO menus (category_id, name, description, price, image, is_available)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [category_id, name.trim(), description.trim(), parseFloat(price), imagePath, is_available]
    );

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      menu: rows[0]
    });
  } catch (error: any) {
    console.error('Create Menu Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /api/admin/menu:
 *   get:
 *     summary: Get all menu items (Admin view)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all menus
 */
export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const { category_id, search } = req.query;

    let sql = `
      SELECT m.*, c.name as category_name 
      FROM menus m 
      LEFT JOIN categories c ON m.category_id = c.id 
      WHERE 1=1
    `;
    const params: any[] = [];
    let count = 1;

    if (category_id) {
      sql += ` AND m.category_id = $${count++}`;
      params.push(category_id);
    }

    if (search) {
      sql += ` AND (m.name ILIKE $${count} OR m.description ILIKE $${count})`;
      params.push(`%${search}%`);
      count++;
    }

    sql += ' ORDER BY m.created_at DESC';

    const { rows: menus } = await pool.query(sql, params);

    res.status(200).json({
      success: true,
      count: menus.length,
      menus
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /api/admin/menu/{id}/toggle:
 *   patch:
 *     summary: Toggle menu visibility (Open / Close for customers)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu availability updated
 */
export const toggleMenuAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query('SELECT is_available FROM menus WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    const newStatus = !rows[0].is_available;

    await pool.query(
      'UPDATE menus SET is_available = $1, updated_at = NOW() WHERE id = $2',
      [newStatus, id]
    );

    res.status(200).json({
      success: true,
      message: `Menu is now ${newStatus ? 'OPEN (visible to users)' : 'CLOSED (hidden from users)'}`,
      is_available: newStatus
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /api/admin/menu/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               is_available:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu updated successfully
 */
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price, is_available } = req.body;
    const { id } = req.params;

    const { rows: existingRows } = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    const existing = existingRows[0];

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    if (name && name.toLowerCase() !== existing.name.toLowerCase()) {
      const { rows: dup } = await pool.query(
        'SELECT id FROM menus WHERE category_id = $1 AND LOWER(name) = LOWER($2) AND id != $3',
        [existing.category_id, name, id]
      );
      if (dup.length > 0) {
        return res.status(409).json({ success: false, message: `Menu "${name}" already exists in this category` });
      }
    }

    if (price && parseFloat(price) <= 0) {
      return res.status(400).json({ success: false, message: 'Price must be greater than 0' });
    }

    let imagePath = existing.image;
    if (req.file) imagePath = req.file.path.replace(/\\/g, '/');

    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (name) { updates.push(`name = $${idx++}`); values.push(name.trim()); }
    if (description) { updates.push(`description = $${idx++}`); values.push(description.trim()); }
    if (price) { updates.push(`price = $${idx++}`); values.push(parseFloat(price)); }
    if (is_available !== undefined) { updates.push(`is_available = $${idx++}`); values.push(is_available); }
    updates.push(`image = $${idx++}`);
    values.push(imagePath);

    values.push(id);

    const sql = `UPDATE menus SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${idx}`;
    await pool.query(sql, values);

    res.status(200).json({ success: true, message: 'Menu updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @swagger
 * /api/admin/menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 */
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM menus WHERE id = $1', [req.params.id]);
    if (rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};