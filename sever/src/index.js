import express from "express" //or const express =require("express")
import cors from "cors"
import mongoose from "mongoose"


import {userRouter} from './routes/users.js'

const app=express() //to generate version of API

app.use(express.json()); //for every single request from frontend it will create object
app.use(cors());


//"/auth" is which url userRouter router will display
app.use("/auth",userRouter);

mongoose.connect("mongodb+srv://Harsh_Aakoliya:Onlinejudge123@onlinejudge.5qlpg2h.mongodb.net/OnlineJudge?retryWrites=true&w=majority")

//when ever we run server by writing node src/index.js it will print "SERVER STARTED"
//PORT is 3001 because 3000 is for frontend
app.listen(3001,()=>{
    console.log("SERVER STARTED");
})