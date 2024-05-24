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

export {app};