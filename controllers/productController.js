import ProductService from "../services/productServices.js";
import { ProductDTO } from "../dtos/ProductDto.js";

const ProductServices = new ProductService();

const getAllProducts = async (req,res)=>{
    const data = await ProductServices.getAllProducts()
    res.json(data.map((product) => new ProductDTO(product)));
    
}

const getProducsByCategory = async (req,res) => {
    const data = await ProductServices.getProducsByCategory(req.params.category)
    res.json(data.map((product) => new ProductDTO(product)));
}

const getProduct = async (req,res)=>{
    
    const product = await ProductServices.getProductById(req.params.id);
    res.json(new ProductDTO(product));
}

const createProduct = async (req,res)=>{
    
    const newProduct = await ProductServices.createProduct(req.body)
  
    res.json(new ProductDTO(newProduct));
}

const deleteProduct= async (req,res)=>{
    
    await ProductServices.deleteProductById(req.params.id);
    res.json(`Se elimino correctamente el producto con ID ${req.params.id}`);
}

const updateProduct = async (req,res)=>{
    
    const updatedProduct= await ProductServices.updateProductById(req.params.id,req.body);
    res.json(new ProductDTO(updatedProduct));
}




export default {getAllProducts,getProducsByCategory, getProduct, createProduct, deleteProduct, updateProduct}