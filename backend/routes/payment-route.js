import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

const stripeInstance = stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const paymentRouter = express.Router();
console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)
if(!!stripeInstance){
    paymentRouter.route("/payment/create-checkout-session").post(async(req,res) => {
    const {products, donation, pincode} = req.body;

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
        cancel_url:"http://localhost:3000/donations",
    });

//     !!donation && await donationServices.updateDonation(pincode, donation._id, {...donation, amountAchieved: session.amountAchieved}).then((d)=> {
//         // donationServices.getDonations(pincode).then((d)=> {
//             // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
//             // setDonations(d)
//             console.log(d);
//         // }
//     // );
// });
// await callAnotherAPI(session.id, products.price);

    res.json({id:session.id, amountAchieved: products.price})
 
});}

export default paymentRouter;