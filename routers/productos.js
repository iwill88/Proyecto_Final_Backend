
import { Router } from "express"

import dotenv from "dotenv"
dotenv.config()

import productController from "../controllers/productController.js"

let db 

db=productController



const routerProductos = Router();




routerProductos.get('/', db.getAllProducts);

routerProductos.get('/category/:category', db.getProducsByCategory);

routerProductos.get('/:id', db.getProduct);

routerProductos.post ('/', db.createProduct)

routerProductos.delete('/:id', db.deleteProduct);

routerProductos.put('/:id', db.updateProduct);

export default routerProductos;