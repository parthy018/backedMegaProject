import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CROS_ORIGIN,
    credentials:true,
     
}));

app.use(express.json(
    {limit:"50kb"}
));     // configuring json that i am accepting json

app.use(express.urlencoded({extended:true,
    limit:"50kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from "./routes/User.Routes.js";

app.use("/api/v1/users" , userRouter);
// yaha se control pass ho jayega aur userRouter ko chala jayega
// https:localhost:8000/user/register
// https:localhost:8000/user/login


export {app};