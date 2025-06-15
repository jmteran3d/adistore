import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
app.use(express.json());

app.get("/", (req, res)=> {
  res.json({ message: "Hola! Bienvenido a AdiStore" });
});
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080");
});
