import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

const user = { username: "FedericoDev01", isAdmin: true };

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
    res.render("home", { products, user });
  } catch (error) {
    res.render("error");
  }
});

router.get("/contact", middlewareIsAdmin, (req, res)=> {
  res.render("contact");
});

export default router;