import express from "express";
import { Server } from "socket.io";
import http from "http";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./managers/ProductManager.js";


const app = express();
const server = http.createServer(app);

//configuramos nuestro server para que acepte solicitudes websockets
// Input - Output
const io = new Server(server);
const productManager = new ProductManager("./src/data/products.json");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
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

  // Productos: enviar productos al conectar
  socket.emit("productosActualizados", await productManager.getProducts());

  // Productos: nuevo producto
  socket.on("nuevoProducto", async (prod) => {
    await productManager.addProduct(prod);
    const productos = await productManager.getProducts();
    io.emit("productosActualizados", productos);
  });

  // Productos: eliminar producto
  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProductById(id);
    const productos = await productManager.getProducts();
    io.emit("productosActualizados", productos);
  });
});

server.listen(8080, ()=> {
  console.log("Servidor iniciado correctamente en http://localhost:8080");
});

export { io };

