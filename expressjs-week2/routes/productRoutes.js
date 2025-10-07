import express from "express";
import { v4 as uuidv4 } from "uuid";
import { products } from "../data/products.js";
import { validateProduct } from "../middleware/validation.js";
import { NotFoundError } from "../middleware/errorHandler.js";

const router = express.Router();

// GET all products (with filter, pagination, and search)
router.get("/", (req, res) => {
  let { category, search, page = 1, limit = 5 } = req.query;
  let result = [...products];

  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json({
    total: result.length,
    page: parseInt(page),
    data: paginated,
  });
});

// GET one product
router.get("/:id", (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
});

// POST new product
router.post("/", validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put("/:id", validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
router.delete("/:id", (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

// GET product statistics
router.get("/stats/categories", (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

export default router;
