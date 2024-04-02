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
const adminRouter = express_1.default.Router();
adminRouter.use(express_1.default.json());
const client = new client_1.PrismaClient();
const adminMiddleware = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const admin = yield client.user.findUnique({
                where: {
                    id: payload.userId,
                }
            });
            if ((admin === null || admin === void 0 ? void 0 : admin.email) === 'admin@gmail.com' && admin.password === 'admin@admin') {
                next();
                return;
            }
            else {
                return res.status(401).json({
                    error: "unauthorized!"
                });
            }
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
};
adminRouter.post("/add", adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield client.course.create({
            data: {
                title: req.body.title,
                description: req.body.description,
            }
        });
        return res.json({
            msg: "course created!",
            course,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = adminRouter;
