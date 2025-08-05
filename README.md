![Coderhouse - Backend I Course](https://img.shields.io/badge/Coderhouse-Backend-blueviolet?style=for-the-badge&logo=OpenAI&logoColor=white)

# 🛍️ AdiStore - Entrega Final Backend I


# 🛍️ AdiStore API

Servidor RESTful y en tiempo real para gestión de productos y carritos de compra, desarrollado con Node.js, Express.js, MongoDB, Mongoose, Socket.io y Handlebars. Proyecto final del curso Backend I de Coderhouse.

## 📦 Tecnologías utilizadas

Node.js

Express.js

MongoDB + Mongoose

Express Handlebars

Socket.io (WebSockets para productos en tiempo real y chat)

Multer (para carga de imágenes)

JavaScript (Frontend y Backend)

Nodemon (modo desarrollo)

Dotenv (variables de entorno)

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone

### 2. Instalar dependencias

npm install

Crear archivo .env con:

PORT=8080
URI_MONGODB=<tu-cadena-de-conexion-mongodb-atlas>

### 3. Ejecutar en modo desarrollo

npm start

El servidor se ejecuta en: http://localhost:8080

### 4. 📁 Estructura del Proyecto

📁 Estructura del Proyecto y Endpoints Principales
Productos /api/products
| Método | Ruta                 | Descripción                                                                         |
| ------ | -------------------- | ----------------------------------------------------------------------------------- |
| GET    | `/api/products`      | Listar productos con paginación, filtros y ordenamientos (limit, page, query, sort) |
| GET    | `/api/products/:pid` | Obtener detalle de producto por ID                                                  |
| POST   | `/api/products`      | Crear un nuevo producto                                                             |
| PUT    | `/api/products/:pid` | Actualizar un producto (excepto ID)                                                 |
| DELETE | `/api/products/:pid` | Eliminar un producto por ID                                                         |


Carritos /api/carts
| Método | Ruta                            | Descripción                                              |
| ------ | ------------------------------- | -------------------------------------------------------- |
| POST   | `/api/carts`                    | Crear un carrito vacío                                   |
| GET    | `/api/carts`                    | Listar todos los carritos                                |
| GET    | `/api/carts/:cid`               | Obtener productos populados de un carrito por ID         |
| POST   | `/api/carts/:cid/product/:pid`  | Agregar un producto al carrito (suma cantidad si existe) |
| PUT    | `/api/carts/:cid`               | Reemplazar todos los productos del carrito               |
| PUT    | `/api/carts/:cid/products/:pid` | Actualizar solo la cantidad de un producto en el carrito |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar un producto específico del carrito              |
| DELETE | `/api/carts/:cid`               | Vaciar todos los productos del carrito                   |

🧩 Funcionalidades Destacadas
✅ Persistencia en MongoDB
Modelos Product y Cart con esquemas robustos y referencias (populate en productos de carrito).

Paginación, filtros (query por categoría o disponibilidad) y ordenamientos (sort asc/desc por precio) en productos.

✅ WebSockets en Tiempo Real
Vista /realtimeproducts para agregar/eliminar productos sin recargar.

Sincronización instantánea entre todos los clientes conectados.

Chat en tiempo real con almacenamiento en memoria para demo.

✅ Vistas con Handlebars
Página principal / con lista paginada y botón “Agregar al carrito”.

Detalle de producto /products/:pid con botón para agregar al carrito.

Vista de carrito /carts/:cid mostrando productos y cantidades con subtotales.

✅ Carga de imágenes con Multer
Manejo de archivos para imágenes de productos.

✅ Validaciones básicas y manejo de errores
Respuestas claras con estados success o error y mensajes descriptivos.

🖥️ Rutas Web y Vistas Principales
Ruta	Descripción
/	Vista con listado paginado productos
/products/:pid	Detalle de producto
/carts/:cid	Vista del carrito con productos
/realtimeproducts	Productos en tiempo real (WebSockets)

👨‍💻 Autor

Jesús Terán Dávila

¿Dudas o sugerencias? ¡Estoy en LinkedIn! 👉 [linkedin.com/in/jmteran3d](https://www.linkedin.com/in/jmteran3d)

📝 Licencia
Este proyecto se encuentra bajo la licencia ISC.


