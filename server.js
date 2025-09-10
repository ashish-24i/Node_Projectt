import express from 'express';

//import cors from "cors";

import {routes} from "./Routes/product.routes.js";

import {routes1} from "./Routes/cart.route.js";

import mongoose  from 'mongoose';

const app = express();

//app.use(cors());

app.use(express.json());

app.listen(3000,()=>{

    console.log("Server is running on port 3000");

})


mongoose.connect("mongodb://localhost:27017")

const db = mongoose.connection;

db.on("open",()=>{
    console.log("Database connected");
})


db.on("error",(err)=>{
    console.log("Database connection error:",err);
})


routes(app);

routes1(app);

