"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const courses_1 = __importDefault(require("./routes/courses"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
app.use("/user", user_1.default);
app.use("/course", courses_1.default);
app.use("/admin", admin_1.default);
app.use(express_1.default.json());
app.listen(8000, () => {
    console.log("listening to port 8000");
});
