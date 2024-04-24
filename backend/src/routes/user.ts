import express from "express"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import { signupSchema, signinSchema } from "@a-khushal/course-selling";

const client = new PrismaClient();
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/signup", async(req, res)=>{
    try{
        const { success } = signupSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                msg: "Inputs are incorrect"
            })
        }
        const userAlreadyExists = await client.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if(userAlreadyExists){
            return res.status(403).json({
                msg: "user already exists"
            })
        }
        const user = await client.user.create({
            data:{
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
            }
        });
        const secret = process.env.JWT_SECRET || "";
        const token = jwt.sign({userId: user.id}, secret);
        res.status(200).json({
            token
        })
    } catch (error){
        console.log(error);
        res.status(403).json({
            error: "error while signing up!"
        })
    }
});


userRouter.post("/signin", async(req, res)=>{
    try{
        const { success } = signinSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                msg: "Inputs are incorrect"
            })
        }
        const user = await client.user.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        if(!user){
            res.status(403).json({
                msg: "user doesn't exists. Consider signing up"
            });
            return;
        }
        const secret = process.env.JWT_SECRET || "";
        const token = jwt.sign({userId: user.id}, secret);
        res.status(200).json({
            token
        });
    } catch (error){
        console.log(error);
        res.status(403).json({
            error: "error while logging in!"
        })
    }
});

export default userRouter;