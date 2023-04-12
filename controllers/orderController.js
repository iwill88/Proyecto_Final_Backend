import OrderService from "../services/orderServices.js";

const OrderServices = new OrderService();

const findOrderbyId = async (req,res)=>{
    const order = await OrderServices.findOrderById(req.params.id);
    res.json(order);
}

const createOrder = async (req,res)=>{
    
    const newOrder= await OrderServices.createOrder(req.body.id_user)
    res.json(newOrder);
}

const createOrderEjs = async (req,res)=>{
    
    await OrderServices.createOrder(req.body.id_user)
    res.redirect("/order")
    
}



export default {findOrderbyId, createOrder, createOrderEjs}