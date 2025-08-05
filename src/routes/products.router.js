import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

// GET con filtros, paginación y orden
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Filtro dinámico
    let filter = {};
    if (query) {
      filter = {
        $or: [
          { category: query },
          { status: query === "true" } // Para filtrar por disponibilidad
        ]
      };
    }

    // Opciones de paginación
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true
    };

    const data = await Product.paginate(filter, options);
    const products = data.docs;
    delete data.docs;

    res.status(200).json({ status: "success", payload: products, ...data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" });
  }
});


// GET por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST nuevo producto
router.post("/", async(req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnail } = req.body;

    const product = new Product({ title, description, code, price, stock, category, thumbnail });
    await product.save();

    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear un nuevo producto" });
  }
});

// PUT actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al modificar un producto" });
  }
});

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
