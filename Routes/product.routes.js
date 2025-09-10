import {createProduct, fetchProducts,fetchProductWithId, removeFromCart , updateCart} from "../Controller/product.controller.js"



export function routes(app){


    try{
   app.post("/product",createProduct);

    app.get("/products" , fetchProducts);
    app.get("/products/:id" , fetchProductWithId);
    
    app.put("/product/:id",  updateCart);


    app.delete("/product/:id",  removeFromCart);


    }
    catch(error){
         console.log("error while performing this operation: may be got invalid URL")
    }

}