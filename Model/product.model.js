import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
      
       id: Number,  
       price: Number,
      description: String,
      stockQuantity: Number,

})


const productModel = mongoose.model("Product", productSchema);

export default productModel;