import { Router } from "express";
/* import CartManager from "../managers/CartManager.js"; */
import Cart from "../models/cart.model.js";

const router = Router();
/* const cartManager = new CartManager("./src/data/carts.json"); */

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
    const carts = await cartManager.getCarts();
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

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

export default router;
