import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      
       id:{
            type :Number,
            unique: true,
            required: true
           },
       price:{
          type:Number,
          required:true
       },
        name: {
          type: String,
          required: true
        },
      description:{
          type:String,
          required:true
      },

      stockQuantity:{
          type:Number,
          required:true
      } 

})


const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;