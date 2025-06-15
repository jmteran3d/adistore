import fs from "fs";

class CartManager {
  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  async getCarts() {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const carts = JSON.parse(fileData);
      return carts;
    } catch (error) {
      throw new Error(`Error al traer los carritos - ${error.message}`);
    }
  }

  generateNewId(carts) {
    if (carts.length > 0) {
      return carts[carts.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  async saveCarts(carts) {
    try {
      await fs.promises.writeFile(
        this.pathFile,
        JSON.stringify(carts, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(`Error al guardar los carritos - ${error.message}`);
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: this.generateNewId(carts),
        products: [],
      };
      carts.push(newCart);
      await this.saveCarts(carts);
      return newCart;
    } catch (error) {
      throw new Error(`Error al crear el carrito - ${error.message}`);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === parseInt(cid));
      if (!cart) throw new Error("Carrito no encontrado");
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener el carrito - ${error.message}`);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === parseInt(cid));
      if (cartIndex === -1) throw new Error("Carrito no encontrado");

      const productIndex = carts[cartIndex].products.findIndex(
        (p) => p.product === parseInt(pid)
      );

      if (productIndex !== -1) {
        carts[cartIndex].products[productIndex].quantity++;
      } else {
        carts[cartIndex].products.push({ product: parseInt(pid), quantity: 1 });
      }

      await this.saveCarts(carts);
      return carts[cartIndex];
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito - ${error.message}`);
    }
  }
}

export default CartManager;
