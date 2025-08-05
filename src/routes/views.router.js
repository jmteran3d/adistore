import { Router } from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const router = Router();

/**
 * GET /products
 * Vista con listado de productos paginados
 */
router.get("/", async(req, res)=> {
  try{
    let { limit = 10, page = 1, sort, query} = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    // Filtro dinámico
    let filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    // Opciones paginate
    const options = {
      limit,
      page,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true,
    };

    const data = await Product.paginate(filter, options);
    const products = data.docs;
    delete data.docs;

    const links = [];

    for(let index = 1; index <= data.totalPages; index++ ){
      links.push({ text: index, link: `?limit=${limit}&page=${index}` });
    };

    res.render("home", { products, links, page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.hasPrevPage ? `/products?page=${data.prevPage}&limit=${limit}` : null,
      nextLink: data.hasNextPage ? `/products?page=${data.nextPage}&limit=${limit}` : null,});
  }catch(error){
    res.status(500).send({ message: error.message });
  }
});

/**
 * GET /products/:pid
 * Vista detalle de un producto
 */
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) {
      return res.status(404).render("404", { message: "Producto no encontrado" });
    }

    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * GET /carts/:cid
 * Vista del carrito con productos populados
 */
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product").lean();

    if (!cart) {
      return res.status(404).render("404", { message: "Carrito no encontrado" });
    }

    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


/**
 * GET /realtimeproducts
 * Vista de productos en tiempo real usando WebSockets
 */
router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;