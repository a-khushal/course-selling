"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("./routes/user"));
const router = express_1.default.Router();
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.use("/user", user_1.default);
app.use(express_1.default.json());
const signedInMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers) {
            return res.status(400).json({ error: "Request headers not found" });
        }
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                error: "unauthorized!"
            });
        }
        const jwtToken = token.split(" ")[1];
        const secret = process.env.JWT_SECRET || "";
        const payload = jsonwebtoken_1.default.verify(jwtToken, secret);
        req.body.userId = payload.userId;
        next();
    }
    catch (error) {
        // console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/verify", signedInMiddleware, (req, res) => {
    res.send("verified");
});
app.listen(8000, () => {
    console.log("listening to port 8000");
});
