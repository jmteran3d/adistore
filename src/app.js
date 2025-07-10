import express from "express";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

/* app.get("/", (req, res)=> {
  res.json({ message: "Hola! Bienvenido a AdiStore" });
}); */

//endpoints
app.get("/", (req, res)=> {
  res.render("home");
});
app.get("/contact", (req, res)=> {
  res.render("contact");
});

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080");
});
