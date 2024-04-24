
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken"
import { createCourseSchema } from "@a-khushal/course-selling";

const adminRouter = express.Router();
adminRouter.use(express.json());

const client = new PrismaClient();

const adminMiddleware = async function(req: Request, res: Response, next: NextFunction){
    try{
        if(!req.headers){
            return res.status(400).json({ error: "Request headers not found" });
        }
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({
                error: "unauthorized!"
            })
        }
        const jwtToken = token.split(" ")[1];
        const secret = process.env.JWT_SECRET || "";
        const payload = jwt.verify(jwtToken, secret) as JwtPayload;
        req.body.userId = payload.userId ;
        const admin = await client.user.findUnique({
            where: {
                id: payload.userId,
            }
        });
        if(admin?.email === 'admin@gmail.com' && admin.password === 'admin@admin') {
            next();
            return;
        } else {
            return res.status(401).json({
                error: "unauthorized!"
            })
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

adminRouter.post("/create", adminMiddleware, async(req, res)=>{
    try{
        const { success } = createCourseSchema.safeParse(req.body);
        if(!success){
            res.status(411).json({
                msg: "Inputs are incorrect"
            })
        }
        const course = await client.course.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            }
        });
        return res.json({
            msg: "course created!", 
            course,
        });
    } catch(e){
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

adminRouter.delete("/delete/:id", adminMiddleware, async(req, res)=>{
    try{
        const course = await client.course.delete({
            where: {
                id: req.params.id,
            }
        });
        return res.json({
            msg: "course deleted", 
            course,
        });
    } catch(e){
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

export default adminRouter;