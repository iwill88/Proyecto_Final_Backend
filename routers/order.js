import { Router } from "express";

import orderController from "../controllers/orderController.js";

let db
db= orderController

const routerOrders = Router();

routerOrders.get('/:id', db.findOrderbyId);

routerOrders.post('/createOrder', db.createOrder);

//Router view

routerOrders.post('/createOrderEjs', db.createOrderView);

export default routerOrders