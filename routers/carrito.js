import {Router} from "express"

import dotenv from "dotenv"
dotenv.config()

import cartController from "../controllers/cartController.js";

let db
db= cartController


const routerCarrito = Router();


routerCarrito.get('/', db.getAllCarrito);

routerCarrito.get('/:id/productos', db.getCarrito);

routerCarrito.post ('/', db.postCarrito);

routerCarrito.post('/:id/productos', db.addProducts);

routerCarrito.post ('/addProduct', db.addProduct);

routerCarrito.get ('/:id_user', db.getCartbyUser);

routerCarrito.post ('/updateCant/:id_user', db.updateProductQuantity);

routerCarrito.post ('/removeProd/:id_user', db.removeProduct);

routerCarrito.post ('/emptyCart/:id_user', db.emptyCart);

routerCarrito.delete('/:id', db.deleteCart);

//Router view

routerCarrito.post('/addProductView', db.addProductView)


export default routerCarrito;