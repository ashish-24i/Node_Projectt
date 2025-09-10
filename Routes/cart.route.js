import {createProduct, removeFromCart, fetchProductWithId,  fetchProducts , updateCart} from "../Controller/cart.controller.js"




export function routes1(app){


    try{
   app.post("/cart",createProduct);

    app.get("/carts" , fetchProducts);
    app.get("/carts/:id" , fetchProductWithId);
    
    app.put("/cart/:id",  updateCart);


    app.delete("/cart/:id",  removeFromCart);


    }
    catch(error){
         console.log("error while performing this operation: may be got invalid URL")
    }

}