import express, { Router } from "express";
import bcrypt from "bcrypt";
import { client } from "../index.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 
import auth from "../middleware/auth.js";
dotenv.config()

const router = express.Router();

async function generatePassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


router.post("/signup", async (req, res) => {
    const data = req.body;
    const getUserbyName =  await client.db("b38wd").collection("users").findOne({username:data.username});
    if (getUserbyName){
        res.send("user Already Exists");
    }else if(data.password.length < 8){
        res.send("Password must be at least 8 characters long")
    }else{
        data.password = await generatePassword(data.password);
    const result = await client.db("b38wd").collection("users").insertOne(data);
    res.send("User created successfully")
    }  
})

router.post("/login",async(req, res)=>{
    const {username,password} = req.body;
    const getUserbyName = await client.db("b38wd").collection("users").findOne({username:username});
    if(!getUserbyName){
        res.status(401).send({message:"Invalid Credentials"})
    }else{
        const storedPassword = getUserbyName.password;
        const isPasswordMatch =await bcrypt.compare(password, storedPassword)
        if(isPasswordMatch){
            const token = jwt.sign({id:getUserbyName._id}, process.env.SECRET)
            res.send({message:"login seccussfully",token:token})
        }else {
            res.status(401).send({message:"Invalid Credentials"})
        }
    }
})

export default router;
