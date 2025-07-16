![Coderhouse - Backend I Course](https://img.shields.io/badge/Coderhouse-Backend-blueviolet?style=for-the-badge&logo=OpenAI&logoColor=white)

# 🛍️ AdiStore - Segunda Pre Entrega


# 🛍️ AdiStore API

Proyecto de servidor RESTful desarrollado con **Node.js** y **Express.js**, para la gestión de productos y carritos de compra. Forma parte de la Segunda Entrega del curso de Backend I de Coderhouse.

## 📦 Tecnologías utilizadas

- Node.js
- Express.js
- Express Handlebars
- Socket.io
- Multer (para carga de archivos)
- File System (`fs`) para persistencia de datos
- JavaScript (Frontend)
- Nodemon (modo desarrollo)

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone

### 2. Instalar dependencias

npm install

### 3. Ejecutar en modo desarrollo

npm run dev

El servidor se ejecuta en: http://localhost:8080

### 4. 📁 Estructura del Proyecto

📌 Endpoints disponibles
🛒 /api/products
| Método | Ruta                 | Descripción                           |
| ------ | -------------------- | ------------------------------------- |
| GET    | `/api/products`      | Lista todos los productos             |
| GET    | `/api/products/:pid` | Obtiene un producto por su ID         |
| POST   | `/api/products`      | Crea un nuevo producto                |
| PUT    | `/api/products/:pid` | Actualiza un producto (excepto su ID) |
| DELETE | `/api/products/:pid` | Elimina un producto por ID            |

Los productos se almacenan en products.json. El campo id se genera automáticamente.

🧺 /api/carts
| Método | Ruta                           | Descripción                                   |
| ------ | ------------------------------ | --------------------------------------------- |
| POST   | `/api/carts`                   | Crea un nuevo carrito vacío                   |
| GET    | `/api/carts`                   | Lista todos los carritos (opcional)           |
| GET    | `/api/carts/:cid`              | Muestra productos de un carrito por ID        |
| POST   | `/api/carts/:cid/product/:pid` | Agrega un producto al carrito (suma cantidad) |


Los carritos se almacenan en carts.json con un array de productos { product, quantity }.

## 🧩 Funcionalidades Implementadas

### ✅ Handlebars Configurado
- Motor de plantillas configurado correctamente.
- Vista principal `/` muestra todos los productos actuales desde `products.json`.

### ✅ Vista en Tiempo Real `/realtimeproducts`
- Muestra productos en vivo.
- Permite **agregar** productos usando WebSockets.
- Permite **eliminar** productos desde la misma vista.
- Sin recargar la página, el DOM se actualiza automáticamente.

### ✅ WebSocket Configurado
- Emite evento `nuevoProducto` y `eliminarProducto` desde el cliente.
- El servidor responde con `productosActualizados` y actualiza la vista.

### ✅ Carga de archivos con Multer
- Envío de imágenes desde formulario HTML (`products.router.js`).

### ✅ Chat WebSocket (adicional)
- Sección de mensajes simulando un chat simple.
- Usa eventos WebSocket para compartir mensajes entre clientes conectados.

✅ Estado del Proyecto

✔ Primera entrega completa.
✔ Segunda entrega completa.

🚧 Validación de campos y manejo avanzado de errores será implementado en entregas futuras.

👨‍💻 Autor

Jesús Terán Dávila

¿Dudas o sugerencias? ¡Estoy en LinkedIn! 👉 [linkedin.com/in/jmteran3d](https://www.linkedin.com/in/jmteran3d)

📝 Licencia
Este proyecto se encuentra bajo la licencia ISC.


