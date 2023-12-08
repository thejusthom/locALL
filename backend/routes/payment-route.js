import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

const stripeInstance = stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const paymentRouter = express.Router();
console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)
if(!!stripeInstance){
    paymentRouter.route("/payment/create-checkout-session").post(async(req,res)=>{
    const {products} = req.body;

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
            },
            unit_amount:product.price * 100,
        },
        quantity:1,
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/donations/sucess",
        cancel_url:"http://localhost:3000/donations/cancel",
    });

    res.json({id:session.id})
 
});}

export default paymentRouter;