import express from "express";
import userRouter from "./routes/user";
import courseRouter from "./routes/courses";
import adminRouter from "./routes/admin";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(8000, ()=>{
    console.log("listening to port 8000");
});