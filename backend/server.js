import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// app config
const app = express();
const port = process.env.PORT || 3000;
 


// middleware
app.use(express.json()); // whenever we will get request from frontend to backend , it will be parsed you json
app.use(cors()); // we can access the backedn from any frontend.
// DB connection
connectDB();
// api endpoints
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/images',express.static('uploads'));
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get("/",(req,res)=>{
    res.send("API Working"); // will get this response whenever we get request at this end .
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})
// mongodb+srv://arshitbhootna:Password123@cluster0.dksud.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0