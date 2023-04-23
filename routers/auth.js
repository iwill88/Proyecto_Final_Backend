import ProductService from "../services/productServices.js";
import CartService  from "../services/cartServices.js";
import MessageService from "../services/messageServices.js";
import { ProductDTO } from "../dtos/ProductDto.js";

const ProductServices = new ProductService()
const CartServices = new CartService()
const MessageServices = new MessageService()


export const configAuthRouter = (authRouther,upload,passport) => {
    authRouther
  
    // REGISTER
    
    .get("/register", (req, res) => {
        res.render('pages/register');
    })
    
    .post(
        "/register",upload.single("picture"), 
            passport.authenticate("register", {
            failureRedirect: "/failregister",
            successRedirect: "/login",
        })
    )
    
    // FAIL
    
    .get("/failregister", (req, res) => {
        res.render('pages/failregister');
    })
    
    .get("/faillogin", (req, res) => {
        res.render('pages/faillogin');
    })
    
    // BACK
    
    .post("/backRegister", (req,res) => {
        res.redirect('/register')
    })
    
    .post("/backLogin", (req,res) => {
        res.redirect('/login')
    })

    .post("/backHome", (req,res) => {
        res.redirect('/')
    })
    
    // LOGIN
    .get('/login', async (req, res) => {
        if (req.isAuthenticated()) {
        res.render('pages/index', {
            usuario: req.user.name, 
            cart: req.user.cart
        });
    } else {
        res.render('pages/login');
    }
    })


    .post('/login',
        passport.authenticate("login", {
        failureRedirect: "/faillogin",
        successRedirect: "/login",
        })
    )


    // LOGOUT

    .post("/logout", (req, res) => {
        req.session.destroy((err) => {
        if (!err)  res.render('pages/logOut', {usuario:req.user.name});    
        else console.log({ status: "Logout ERROR", body: err });
        })
    })

    //PROFILE
    
    .get("/profile", (req,res) => {
        if (req.isAuthenticated()) {


        res.render('pages/profile', {
            usuario: req.user.email,
            name: req.user.name,
            address: req.user.address,
            age: req.user.age,
            phone: req.user.phone,
            picture: req.user.picture,
            cart: req.user.cart
        });
    } else {
        res.render('pages/login');
    }
    } )

    //PRODUCTS

    .get("/products", async (req,res) => {
        if (req.isAuthenticated()) {
        const productos = await ProductServices.getAllProducts();
        const productosFormatted= productos.map((producto)=>new ProductDTO(producto))
        res.render('pages/products', {
            productos:productosFormatted, 
            id_user: req.user.id, 
            cart: req.user.cart
            });
    } else {
        res.render('pages/login');
    }
    } )

    // CART

    .get("/cart", async (req,res) => {
        if (req.isAuthenticated()) {
            
        const productos = await CartServices.getCart(req.user.id);
        
        res.render('pages/cart', {
            name: req.user.name,
            id_user: req.user.id,
            productos: productos,
        });
    } else {
        res.render('pages/login');
    }
    } )

    // CHAT

    .get("/chat",  (req,res) => {
        if (req.isAuthenticated()) {
        res.render('pages/chat', {
            usuario: req.user.email,
            type: req.user.isAdmin,
            cart: req.user.cart,
            isAdmin: req.user.isAdmin
            });
    } else {
        res.render('pages/login');
    }
    } )

    // MESSAGES

    .get("/messages",  (req,res) => {
        if (req.isAuthenticated()) {

        res.render('pages/messages', {
            usuario: req.user.email,
            type: req.user.isAdmin,
            cart: req.user.cart
            });
    } else {
        res.render('pages/login');
    }
    } )

    .post("/respond",  async (req,res) => {
        if (req.isAuthenticated()) {
            const id = req.body.mensajeId
            const text = req.body.response 
            const email = req.user.email

            const data = { 
                email: email,
                response: text
            }

            await MessageServices.addResponse(id, data)
            res.redirect('/chat')

    } else {
        res.render('pages/login');
    }
    } )


    // ORDERS

    .get("/order",  async (req,res) => {
        if (req.isAuthenticated()) {
        const productos = await CartServices.getCart(req.user.id);
        res.render('pages/orderSuccess', {
            name: req.user.name,
            email: req.user.email,
            id_user: req.user.id,
            productos: productos,
            cart: req.user.cart
            });
    } else {
        res.render('pages/login');
    }
    } )


}