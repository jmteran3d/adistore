import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

const user = { username: "JMTeran3D_Dev", isAdmin: true };

const middlewareIsAdmin = (req, res, next) => {
  if(user.isAdmin){
    next();
  }else{
    res.redirect("/error");
  }
}

router.get("/", async(req, res)=> {
  try {
    const products = await productManager.getProducts();

    // Validación
    if (!Array.isArray(products) || products.length === 0) {
      console.error("❌ 'products' no es un array válido o está vacío");
      return res.render("home", { products: [], user });
    }

    res.render("home", { products, user });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.render("error");
  }
});

router.get("/contact", middlewareIsAdmin, (req, res)=> {
  res.render("contact");
});

export default router;