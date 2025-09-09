import {createProduct, fetchProducts,fetchProductWithId, removeFromCart , updateCart} from "../Controller/product.controller.js"



export function routes(app){

    app.post("/cart",createProduct);

    app.get("/products" , fetchProducts);
    app.get("/products/:id" , fetchProductWithId);
    
    app.put("/cart/:id",  updateCart);


    app.delete("/cart/:id",  removeFromCart);


}