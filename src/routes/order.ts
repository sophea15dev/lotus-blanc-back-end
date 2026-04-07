import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/orders/pre-order:
 *   post:
 *     summary: Create a new pre-order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - items
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "012345678"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "1"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       example: 2
 *                     note:
 *                       type: string
 *                       example: "Please deliver in the morning"
 *     responses:
 *       201:
 *         description: Pre-order created
 *       400:
 *         description: Bad request
 */
router.post('/pre-order', (req, res) => {
  try {
    const { customerId, items } = req.body;

    if (!customerId || typeof customerId !== 'string') {
      return res.status(400).json({
        success: false,
        message: "customerId is required and must be a string"
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "items must be a non-empty array"
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Each item must have productId and quantity"
        });
      }
      if (typeof item.quantity !== 'number' || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "quantity must be a number greater than or equal to 1"
        });
      }
    }

    const orderId = `pre_${Date.now()}`;

    console.log(`✅ New Pre-order received - Order ID: ${orderId}`, {
      customerId,
      itemCount: items.length
    });

    res.status(201).json({
      success: true,
      orderId,
      message: "Pre-order created successfully",
      data: {
        customerId,
        items,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Error creating pre-order:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get customer's pre-orders
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer phone number
 *     responses:
 *       200:
 *         description: List of orders
 *       400:
 *         description: customerId is required
 *       500:
 *         description: Server error
 */
router.get('/my-orders', (req, res) => {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "customerId (phone number) is required"
      });
    }

    // TODO: Replace this with real database query later
    const orders: any[] = [];   // Empty for now

    res.json({
      success: true,
      orders: orders,
      message: orders.length > 0 ? "Orders fetched successfully" : "No active orders found"
    });

  } catch (error: any) {
    console.error("Error fetching my-orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default router;