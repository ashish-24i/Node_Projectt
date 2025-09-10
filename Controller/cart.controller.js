import cartModel from "../Model/cart.model.js";
import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";
//to create a new product
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

//to fetch all products
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

//to fetch product with specific id

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


//to update product details
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

//to delete a product from cart
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

//to create jwt token

export function createToken(req, res) {

    const { email, password } = req.body;

     userModel.findOne({ email }).then((user)=>{
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    if(user.password !== password){
        return res.status(403).json({message:"incorrect password"})
    }
      else{
        const accessToken= jwt.sign({email:email},"secretkey", {expiresIn:'15m'})
    
         res.json({ message: "Login successful", accessToken: accessToken });
      }
     })
    
}

//to authenticate user using jwt token
export function authenticateUser(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(403).json({message:"please provide your credentials"})
    jwt.verify(token, 'secretkey', (err,user)=>{

         
        if(err){
            return res.status(403).json({message:"invalid jwt token"})
        }

        req.user = user;
        next();
    })
}


//to register a new user
export  function regesterUser(req,res){
    
      const { email , password } = req.body;

      const newUser  = new userModel({
           email:email,
           password:password 
      })

      newUser.save().then((data)=>{
        if(!data){
            res.status(400).json({message:"could not register user"})
        }

        res.send(data);
      })
}