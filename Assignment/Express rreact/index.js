import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFile = path.join(__dirname, "products.json");

const app = express();

app.use(cors());
app.use(express.json());

// GET products
app.get("/api/products", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  const products = JSON.parse(data);

  res.json(products);
});

// POST product
app.post("/api/products", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  const products = JSON.parse(data);

  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  products.push(newProduct);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  res.json(newProduct);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  let products = JSON.parse(data);

  const id = parseInt(req.params.id);

  products = products.filter((product) => product.id !== id);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  res.json({
    message: "Product deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
