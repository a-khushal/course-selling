
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
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

courseRouter.get("/bought", signedInMiddleware, async(req, res)=>{
    try{
        const coursesOfUser = await client.courseOfUser.findMany({
            where: {
                userId: req.body.userId,
            },
        });
        return res.status(200).json({
            courses: coursesOfUser, 
        })
    } catch(error) {
        console.log(error);
        return res.status(411).json({error: "Internal Server Error"});
    }
})


courseRouter.get("/bulk", async(req, res)=>{
    try{
        const courses = await client.course.findMany({});
        res.json({
            courses
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

courseRouter.get("/purchases", signedInMiddleware, async(req, res)=>{
    try{
        const userId = req.body.userId;
        const bought = await client.courseOfUser.findMany({
            where: {
                userId
            }
        });
        const user = await client.user.findUnique({
            where: {
                id: userId,
            }
        })
        if(bought.length === 0){
            return res.status(400).json({
                msg: "No courses bought yet!", 
                Username: user?.name,
            });
        }
        const purchased = bought.map(async (buy)=>{
            const course = await client.course.findUnique({
                where: {
                    id: buy.courseId,
                }
            });
            return course
        })
        Promise.all(purchased)
            .then((purchases)=>{
                return res.status(200).json({ 
                    purchases, 
                    Username: user?.name
                });
            })
            .catch((error) => {
                console.error("Error fetching purchases:", error);
                return res.status(500).json({ 
                    error: "Internal Server Error", 
                    Username: user?.name
                });
            });
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

courseRouter.get("/:id", signedInMiddleware, async(req, res)=>{
    try{
        const { id } = req.params;
        const course = await client.course.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json({
            course: course
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

courseRouter.post("/:id/buy", signedInMiddleware, async(req, res)=>{
    try{
        const courseId = req.params.id;
        const userId = req.body.userId;
        const existingRecord = await client.courseOfUser.findFirst({
            where:{
                userId,
                courseId,
            }
        })
        if (existingRecord) {
            return res.status(400).json({ error: "User already owns the course" });
        }
        const bought = await client.courseOfUser.create({
            data: {
                userId: userId,
                courseId: courseId,
            },
        });
        res.status(200).json({ msg: "Course purchased successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default courseRouter;
