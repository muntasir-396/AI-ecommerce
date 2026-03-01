import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ecommerce.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    is_available INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_email TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    parentId TEXT,
    image TEXT
  );
`);

// Seed data if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insert = db.prepare("INSERT INTO products (name, price, category, image, description, is_available) VALUES (?, ?, ?, ?, ?, ?)");
  const products = [
    ["Midnight Velvet Blazer", 249.99, "Outerwear", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800", "A luxurious velvet blazer for evening elegance.", 1],
    ["Silk Slip Dress", 189.00, "Dresses", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800", "Effortless sophistication in pure mulberry silk.", 1],
    ["Cashmere Turtleneck", 159.50, "Knitwear", "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", "Ultra-soft cashmere for timeless warmth.", 1],
    ["Tailored Wool Trousers", 129.00, "Bottoms", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800", "Precision-cut trousers in premium Italian wool.", 1],
    ["Leather Chelsea Boots", 210.00, "Footwear", "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800", "Classic silhouette with modern durability.", 1],
    ["Oversized Linen Shirt", 89.00, "Tops", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800", "Breathable linen for relaxed summer days.", 1]
  ];
  products.forEach(p => insert.run(...p));
}

const categoryCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
if (categoryCount.count === 0) {
  const insert = db.prepare("INSERT INTO categories (id, name, slug, description, parentId, image) VALUES (?, ?, ?, ?, ?, ?)");
  const categories = [
    ['1', 'Women', 'women', 'Luxury apparel and accessories for women.', null, 'https://images.unsplash.com/photo-1539109132314-34a77ae68c44?q=80&w=1974&auto=format&fit=crop'],
    ['1-1', 'Dresses', 'women-dresses', null, '1', null],
    ['1-2', 'Outerwear', 'women-outerwear', null, '1', null],
    ['1-3', 'Handbags', 'women-handbags', null, '1', null],
    ['2', 'Men', 'men', 'Sophisticated tailoring and essentials for men.', null, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop'],
    ['2-1', 'Suits', 'men-suits', null, '2', null],
    ['2-2', 'Accessories', 'men-accessories', null, '2', null],
    ['3', 'Accessories', 'accessories', 'The finishing touches for any ensemble.', null, 'https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=1974&auto=format&fit=crop']
  ];
  categories.forEach(c => insert.run(...c));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.post("/api/categories", (req, res) => {
    const { id, name, slug, description, parentId, image } = req.body;
    db.prepare("INSERT INTO categories (id, name, slug, description, parentId, image) VALUES (?, ?, ?, ?, ?, ?)")
      .run(id, name, slug, description, parentId, image);
    res.json({ success: true });
  });

  app.put("/api/categories/:id", (req, res) => {
    const { id } = req.params;
    const { name, slug, description, parentId, image } = req.body;
    db.prepare("UPDATE categories SET name = ?, slug = ?, description = ?, parentId = ?, image = ? WHERE id = ?")
      .run(name, slug, description, parentId, image, id);
    res.json({ success: true });
  });

  app.delete("/api/categories/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM categories WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/products", (req, res) => {
    const { name, price, category, image, description, is_available } = req.body;
    const info = db.prepare("INSERT INTO products (name, price, category, image, description, is_available) VALUES (?, ?, ?, ?, ?, ?)")
      .run(name, price, category, image, description, is_available ? 1 : 0);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, category, image, description, is_available } = req.body;
    db.prepare("UPDATE products SET name = ?, price = ?, category = ?, image = ?, description = ?, is_available = ? WHERE id = ?")
      .run(name, price, category, image, description, is_available ? 1 : 0, id);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/orders", (req, res) => {
    const { email, total, items } = req.body;
    const info = db.prepare("INSERT INTO orders (customer_email, total, items) VALUES (?, ?, ?)").run(email, total, JSON.stringify(items));
    res.json({ success: true, orderId: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
