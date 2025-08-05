import express from "express";
import { Server } from "socket.io";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import connectMongoDB from "./config/db.js";
import Product from "./models/product.model.js";
import dotenv from "dotenv";
import Handlebars from "handlebars";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

// Conexión MongoDB
connectMongoDB();

//configuramos nuestro server para que acepte solicitudes websockets
// Input - Output
const io = new Server(server);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Configuración Handlebars
app.engine("handlebars", engine({
  helpers: {
    multiply: (a, b) => a * b
  }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Configuración endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//persistencia en memoria de los mensajes de chat
const messages = [];

//websockets desde el servidor
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // Chat: mensajes anteriores
  socket.emit("message history", messages);

  // Chat: nuevo mensaje
  socket.on("new message", (data) => {
    messages.push(data);
    io.emit("broadcast new message", data);
  });

  // Productos: cargar desde MongoDB
  const productos = await Product.find().lean();
  socket.emit("productosActualizados", productos);

  // Nuevo producto
  socket.on("nuevoProducto", async (prod) => {
    const nuevo = new Product(prod);
    await nuevo.save();
    const productosActualizados = await Product.find().lean();
    io.emit("productosActualizados", productosActualizados);
  });

  // Eliminar producto
  socket.on("eliminarProducto", async (id) => {
    await Product.findByIdAndDelete(id);
    const productosActualizados = await Product.find().lean();
    io.emit("productosActualizados", productosActualizados);
  });
});

server.listen(PORT, ()=> {
  console.log("Servidor iniciado correctamente en http://localhost:8080");
});

export { io };

