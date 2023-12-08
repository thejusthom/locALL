import express from 'express';
import * as donationController from '../controllers/donation-controller.js';
import stripe from 'stripe';

const stripeInstance = stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const donationRouter = express.Router();

//get all happenings and post a donation
donationRouter.route('/')
    .get(donationController.get)
    .post(donationController.post);
    
//get, update and delete a donation
donationRouter.route('/:donationId')
    .get(donationController.getById)
    .put(donationController.update)
    .delete(donationController.remove);

    donationRouter.route("/payment/create-checkout-session").post(async(req,res)=>{
        const {products} = req.body;
    
    
        const lineItems = products.map((product)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:product.name,
                    // images:[product.imgdata]
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
     
    })

export default donationRouter;