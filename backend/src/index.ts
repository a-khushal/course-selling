import express from "express";
import userRouter from "./routes/user";
import courseRouter from "./routes/courses";
import adminRouter from "./routes/admin";
import cors from "cors"

const app = express();
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.use(express.json());
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use("/*", cors(corsOptions))

app.listen(8000, ()=>{
    console.log("listening to port 8000");
});