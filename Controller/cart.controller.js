import cartModel from "../Model/cart.model.js";

export  function createProduct(req,res){

      const {id, name, price, description, stockQuantity } = req.body;

      const newProduct  = new cartModel({
              id:id,
           name :name,
           price:price,
           description:description,
           stockQuantity:stockQuantity
      })

      newProduct.save().then((data)=>{
        if(!data){
            res.status(400).json({message:"Error in creating product"})
        }

        res.send(data);
      })
}


export function fetchProducts(req,res){

    cartModel.find().then((data)=>{
        if(!data){
            res.status(404).json({message:"No products found"})
        }

        res.send(data);


    }).catch((err)=>{
        res.status(500).json({message:"Somethig went wrong", error: err.message})   
    })
}


export function fetchProductWithId(req, res) {
    const id = req.params.id; 

   cartModel.findOne({ id : Number(id) })  
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "No product found with given id" });
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({ message: "Something went wrong", error: err.message });
        });
}



export  function updateCart(req,res){

    const id = req.params.id;

     cartModel.findOne({ id : Number(id) }).then((data)=> {
        if(!data){
            res.status(404).json({message:"No product found with given id"})
        }
         
        const keys = Object.keys(req.body);

        keys.forEach((key)=>{
            data[key] = req.body[key];
        })


        data.save().then(updatedProduct=>{
            res.send(updatedProduct);
        })

          
    }).catch((err)=>{
        return res.status(500).json({message:"Somethig went wrong", error: err.message})
        })

}


  export function removeFromCart(req,res){

    const id = req.params.id;

    const deleteResult = cartModel.deleteOne({ id : Number(id) }).then((data)=>{
         if(!data){
            return res.status(404).json({message:"No product found with given id"})
        } 
        
        
        res.send(data)
    }).catch((err=>{
        return res.status(500).json({message:"Somethig went wrong", error: err.message})
    })) 

}