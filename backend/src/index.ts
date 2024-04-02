import express, {Response, Request, NextFunction} from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const app = express();
const client = new PrismaClient();

app.use(express.json());

const signedInMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        if(!req.headers){
            return res.status(400).json({ error: "Request headers not found" });
        }
        const token = req.headers['authorization'];
        console.log(token)
        if(!token){
            return res.status(401).json({
                error: "unauthorized!"
            })
        }
        const jwtToken = token.split(" ")[1];
        const secret = process.env.JWT_SECRET || "";
        const payload = jwt.verify(jwtToken, secret)
        console.log(payload);
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

app.post("/signup", async(req, res)=>{
    try{
        const userAlreadyExists = await client.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if(userAlreadyExists){
            res.status(403).json({
                msg: "user already exists"
            })
            return;
        }
        const user = await client.user.create({
            data:{
                email: req.body.email,
                password: req.body.password
            }
        });
        const secret = process.env.JWT_SECRET || "";
        const token = jwt.sign({userId: user.id}, secret);
        res.status(200).json({
            token
        })
    } catch (err){
        console.log(err);
        res.status(403).json({
            error: "error while signing up!"
        })
    }
});

app.post("/signin", async(req, res)=>{
    try{
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
        })
    } catch (err){
        console.log(err);
        res.status(403).json({
            error: "error while logging in!"
        })
    }
})

app.get("/verify", signedInMiddleware, (req, res)=>{
    res.send("verified");
});

app.listen(8000, ()=>{
    console.log("listening to port 8000");
});