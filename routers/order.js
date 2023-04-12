import { Router } from "express";

import orderController from "../controllers/orderController.js";
import  roleVerification  from "../middlewares/roleVerification.js";

let db
db= orderController

const routerOrders = Router();

routerOrders.get('/:id',  roleVerification, db.findOrderbyId);

routerOrders.post('/createOrder',  roleVerification, db.createOrder);

routerOrders.post('/createOrderEjs',  roleVerification, db.createOrderEjs);

export default routerOrders