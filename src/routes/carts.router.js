import { Router } from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const router = Router();

/**
 * POST /api/carts
 * Crear un nuevo carrito vacío
 */
router.post("/", async (req, res) => {
  try {
    const cart = new Cart();
    await cart.save();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear el carrito" });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * GET /api/carts/:cid
 * Obtener carrito con productos populados
 */
router.get("/:cid", async(req, res)=> {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al traer los productos del carrito" });
  }
});


/**
 * POST /api/carts/:cid/product/:pid
 * Agregar un producto al carrito (si ya existe, aumentar cantidad)
 */
router.post("/:cid/product/:pid", async(req, res)=> {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(cid, { $push : { products: { product: pid, quantity } } }, { new: true });

    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al insertar el producto en el carrito" });
  }
});

/**
 * PUT /api/carts/:cid
 * Reemplazar todos los productos del carrito con un nuevo arreglo
 */
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; // Array [{ product, quantity }]

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = products;
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar el carrito" });
  }
});

/**
 * PUT /api/carts/:cid/products/:pid
 * Actualizar SOLO la cantidad de un producto en el carrito
 */
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ status: "error", message: "Cantidad inválida" });
    }

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const productInCart = cart.products.find((p) => p.product.toString() === pid);
    if (!productInCart) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }

    productInCart.quantity = quantity;
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar la cantidad del producto" });
  }
});

/**
 * DELETE /api/carts/:cid/products/:pid
 * Eliminar un producto específico del carrito
 */
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.status(200).json({ status: "success", message: "Producto eliminado del carrito", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al eliminar producto del carrito" });
  }
});

/**
 * DELETE /api/carts/:cid
 * Vaciar todos los productos del carrito
 */
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();

    res.status(200).json({ status: "success", message: "Carrito vaciado", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al vaciar carrito" });
  }
});


export default router;
