import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const created = await productManager.addProduct(newProduct);
    res.status(201).json({ status: "success", products: created });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const update = req.body;
    if (update.id) delete update.id; // 👈 evita modificar el id
    const updated = await productManager.updateProductById(pid, update);
    res.status(200).json({ status: "success", products: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleted = await productManager.deleteProductById(pid);
    res.status(200).json({ status: "success", products: deleted });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
