const express = require('express');
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Seller routes
router.post('/add', authMiddleware, addProduct); // Add product (seller)
router.put('/update/:id', authMiddleware, updateProduct); // Update product (seller)
router.delete('/delete/:id', authMiddleware, deleteProduct); // Delete product (seller)

// Buyer routes
router.get('/all', getProducts); // Get all products
router.get('/search', searchProducts); // Search products by name or category

module.exports = router;
