import express from 'express';
import * as donationController from '../controllers/donation-controller.js';
import stripe from 'stripe';

const stripeInstance = stripe("sk_test_51OKDhEAul8oR9y69DTyGhz8VZr9DE979PWyIilrSW0X5G7SH4Fg6FQVHUm9U2u1e7NvXF7TMqZxNAt5ItgMHbZNP00nX1SW3H3");

const router = express.Router();

//get all happenings and post a donation
router.route('/')
    .get(donationController.get)
    .post(donationController.post);
    
//get, update and delete a donation
router.route('/:donationId')
    .get(donationController.getById)
    .put(donationController.update)
    .delete(donationController.remove);

router.route("/api/create-checkout-session").post(async(req,res)=>{
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

export default router;