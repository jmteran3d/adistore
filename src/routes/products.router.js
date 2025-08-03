import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import uploader from "../utils/uploader.js";
import Product from "../models/product.model.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    /* const products = await productManager.getProducts(); */
    const products = await Product.find();
    /* res.status(200).json({ status: "success", products }); */
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" });
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

/* router.post("/", uploader.single("file"), async (req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const thumbnail = "/images/" + req.file.filename;
    
    await productManager.addProduct({title, price, thumbnail});
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ status: "error", message: "No se pudo agregar el producto" });
  }
}); */

router.post("/", async(req, res) => {
  try {
    const { title, price, stock } = req.body;

    const product = new Product({ title, price, stock });
    await product.save();

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear un nuevo producto" });
  }
});

/* router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const update = req.body;
    if (update.id) delete update.id; // 👈 evita modificar el id
    const updated = await productManager.updateProductById(pid, update);
    res.status(200).json({ status: "success", products: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}); */

router.put("/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if(!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al modificar un producto" });
  }
});

/* router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const deleted = await productManager.deleteProductById(pid);
    res.status(200).json({ status: "success", products: deleted });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}); */

router.delete("/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al borrar un producto" });
  }
})

export default router;
