import express from "express";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import http from "http";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);

//configuramos nuestro server para que acepte solicitudes websockets
// Input - Output
const io = new Server(server);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
/* app.get("/", (req, res)=> {
  res.render("home");
}); */

/* app.get("/", async (req, res) => {
  const products = await ProductManager.getProducts(); // o como estés cargándolos
  res.render("home", { products });
}); */

app.get("/contact", (req, res)=> {
  res.render("contact");
});

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//persistencia en memoria de los mensajes de chat
const messages = [];

//websockets desde el servidor
io.on("connection", (socket)=> {
  //emitimos un evento desdel el servidor al cliente
  socket.emit("message history", messages);

  console.log("Nuevo usuario conectado");

  socket.on("new message", (data)=> {
    messages.push(data);
    
    //transmitimos el nuevo mensaje a todos los clientes conectados
    io.emit("broadcast new message", data);
  });
});

server.listen(8080, ()=> {
  console.log("Servidor iniciado correctamente en http://localhost:8080");
});
