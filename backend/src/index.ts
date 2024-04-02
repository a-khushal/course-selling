import express from "express";
import userRouter from "./routes/user";
import courseRouter from "./routes/courses";

const app = express();
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.use(express.json());

app.listen(8000, ()=>{
    console.log("listening to port 8000");
});

