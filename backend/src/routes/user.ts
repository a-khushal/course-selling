import express from "express"
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken"
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

userRouter.get("/me", async(req, res)=>{
    try{
        if(!req.headers){
            return res.status(400).json({ error: "Request headers not found" });
        }
        const token = req.headers["authorization"];
        if(!token){
            return res.status(401).json({
                error: "unauthorized!"
            })
        }
        const jwtToken = token.split(" ")[1];
        const secret = process.env.JWT_SECRET || "";
        const payload = jwt.verify(jwtToken, secret) as JwtPayload;
        // req.body.userId = payload.userId ;
        const user = await client.user.findUnique({
            where: {
                id: payload.userId,
            }
        })
        res.status(200).json({
            msg: true,
            Username: user?.name
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

export default userRouter;