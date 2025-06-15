# 🛍️ AdiStore API

Proyecto de servidor RESTful desarrollado con **Node.js** y **Express**, para la gestión de productos y carritos de compra. Forma parte de la Primera Entrega del curso de Backend de Coderhouse.

## 📦 Tecnologías utilizadas

- Node.js
- Express
- File System (`fs`) para persistencia de datos
- JavaScript ESModules (`type: module`)
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

✅ Estado del Proyecto

✔ Primera entrega completa.

🚧 Validación de campos y manejo avanzado de errores será implementado en entregas futuras.

👨‍💻 Autor

Jesús Terán Dávila

LinkedIn | GitHub

📝 Licencia
Este proyecto se encuentra bajo la licencia ISC.


