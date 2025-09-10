import {createProduct, regesterUser , removeFromCart, fetchProductWithId, authenticateUser, fetchProducts, createToken  , updateCart} from "../Controller/cart.controller.js"




export function routes1(app){


    try{
   app.post("/cart",createProduct);

    app.get("/carts" , authenticateUser , fetchProducts);
    app.get("/carts/:id" ,authenticateUser, fetchProductWithId);
    
    app.put("/cart/:id",authenticateUser , updateCart);


    app.delete("/cart/:id",authenticateUser , removeFromCart);
     
    app.post("/login", createToken)

    app.post("/register", regesterUser)

     

    }
    catch(error){
         console.log("error while performing this operation: may be got invalid URL")
    }

}