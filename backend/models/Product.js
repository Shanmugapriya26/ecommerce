const pool = require('../db');

// Create a new product (seller)
const createProduct = async (product) => {
  const { name, category, description, price, discount, seller_id } = product;
  const result = await pool.query(
    'INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, category, description, price, discount, seller_id]
  );
  return result.rows[0];
};

// Get all products (buyer)
const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
};

// Update a product by ID (seller)
const updateProductById = async (id, updatedData, seller_id) => {
  const { name, category, description, price, discount } = updatedData;
  const result = await pool.query(
    'UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 AND seller_id = $7 RETURNING *',
    [name, category, description, price, discount, id, seller_id]
  );
  return result.rows[0];
};

// Delete a product by ID (seller)
const deleteProductById = async (id, seller_id) => {
  const result = await pool.query('DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING *', [id, seller_id]);
  return result.rows[0];
};

// Search products by name or category (buyer)
const searchProductsByNameOrCategory = async (name, category) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  const values = [];
  if (name) {
    values.push(`%${name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }
  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }
  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = { createProduct, getAllProducts, updateProductById, deleteProductById, searchProductsByNameOrCategory };
