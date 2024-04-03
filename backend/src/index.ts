import express from "express";
import userRouter from "./routes/user";
import courseRouter from "./routes/courses";
import adminRouter from "./routes/admin";

const app = express();
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.use(express.json());

app.listen(8000, ()=>{
    console.log("listening to port 8000");
});