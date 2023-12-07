// // require("dotenv").config();
// // const express = ("express");
// import express from 'express';
// // import cors from 'cors';
// import stripe from 'stripe';

// const app = express();
// // const cors = require("cors");
// const stripeInstance = stripe("sk_test_51OKDhEAul8oR9y69DTyGhz8VZr9DE979PWyIilrSW0X5G7SH4Fg6FQVHUm9U2u1e7NvXF7TMqZxNAt5ItgMHbZNP00nX1SW3H3");

// app.use(express.json());
// // app.use(cors());

// // checkout api
// app.post("/api/create-checkout-session",async(req,res)=>{
//     const {products} = req.body;


//     const lineItems = products.map((product)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:product.dish,
//                 images:[product.imgdata]
//             },
//             unit_amount:product.price * 100,
//         },
//         quantity:product.qnty
//     }));

//     const session = await stripeInstance.checkout.sessions.create({
//         payment_method_types:["card"],
//         line_items:lineItems,
//         mode:"payment",
//         success_url:"http://localhost:3000/sucess",
//         cancel_url:"http://localhost:3000/cancel",
//     });

//     res.json({id:session.id})
 
// })


// app.listen(7000,()=>{
//     console.log("server start")
// })