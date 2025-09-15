import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    // const frontend_url = 'http://localhost:5173';
    const frontend_url = 'https://food-restaurent-frontend.onrender.com';  // Update this to the actual frontend URL
    try {
        // Creating a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        
        await newOrder.save();
        console.log("Order model created.");

        // Clearing user's cart after order
        // 

        // Line items necessary for Stripe payment
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",  // Ensure consistency with INR
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,  // Stripe requires amount in cents (INR)
            },
            quantity: item.quantity
        }));
        console.log("Line items created.");

        // Adding delivery charges as an additional line item
        line_items.push({
            price_data: {
                currency: "inr",  // Use INR for delivery charges too
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200 ,  // Delivery charge (2 USD in INR cents)
            },
            quantity: 1
        });
        console.log("Delivery charges added.");

        // Creating a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        console.log("Stripe checkout session created.");


        // Sending the session URL for redirection
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Payment failed due to an error" });
    }
};
const verifyOrder = async(req,res)=>{
    console.log('before verifying for order');
     const {orderId , success} = req.body;
     console.log(orderId+" "+ success);
     try {
        if(success == "true"){
            console.log('updating database')
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success: true , message: "Paid"})
        }
        else{
            console.log("deleteing database value ")
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false , message:"Not paid"})
        }
     } catch (error) {
        console.log(error);
        res.json({success: false , message :"Not Paid"})
     }
}

// users orders for frontend
const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel .find({userId: req.body.userId});
        res.json({success: true , data : orders});

    }
    catch(error){
        console.log("Error:" +error);
        res.json({success: false , message: "Error occured"})
    }
}
// Listing orders for admin panel 
const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success: true , data: orders});
    }
    catch(error){
        console.log("Error:"+ error);
        res.json({success: false , message : " Some error while feteching orders "})
    }
}
// api for updating order status
const updateStatus = async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status: req.body.status});
        res.json({success: true , message: "Status updated"})
    }
    catch(error){
        console.log("ERROR:"+ error);
        res.json({success: false , message : "Some error occured while updating data"})
    }
}
export {updateStatus,listOrders,verifyOrder, placeOrder,userOrders };
