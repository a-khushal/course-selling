
import express, { Response, Request, NextFunction }  from "express"
import { PrismaClient } from "@prisma/client";
import jwt, {JwtPayload} from "jsonwebtoken"

const courseRouter = express.Router();
courseRouter.use(express.json());
const client = new PrismaClient();

interface request extends Request{
    userId? : string,
}

const signedInMiddleware = async(req: request, res: Response, next: NextFunction)=>{
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
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

courseRouter.get("/bulk", async(req, res)=>{
    try{
        const courses = await client.course.findMany({});
        res.json({
            courses
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

courseRouter.get("/:id", signedInMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

export default courseRouter;
