const { createProduct, getAllProducts, updateProductById, deleteProductById, searchProductsByNameOrCategory } = require('../models/Product');

// Add product (seller)
const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, discount } = req.body;
    const seller_id = req.session.user.id; // Assuming session middleware has set req.user
    const product = await createProduct({ name, category, description, price, discount, seller_id });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
  }
};

// Update product (seller)
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const seller_id = req.session.user.id; // Assuming session middleware has set req.user
    const updatedProduct = await updateProductById(productId, req.body, seller_id);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete product (seller)
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const seller_id = req.session.user.id; // Assuming session middleware has set req.user
    const deleted = await deleteProductById(productId, seller_id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

// Search products by name or category (buyer)
const searchProducts = async (req, res) => {
  try {
    const { name, category } = req.query;
    const products = await searchProductsByNameOrCategory(name, category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search products', error: error.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct, searchProducts };
