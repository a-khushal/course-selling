import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient({
    engineType: "binary"
})

const app = express();

app.get("/", (req, res)=>{
    res.send("hi");
})

app.post("/signup", async(req, res)=>{
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
            }
        })
        if(!process.env.JWT_SECRET){
            res.status(403).json({
                error: "jwt is not defined"
            });
            return;
        }
        const token = await jwt.sign({id: user.id}, process.env.JWT_SCERET || "");
        res.status(200).json({
            msg: token
        });
    } catch(err) {
        console.log(err);
        res.status(403).json({
            error: "error while signing up!"
        });
    }
})

app.listen(8000, ()=>{
    console.log("listening to port 8000")
})