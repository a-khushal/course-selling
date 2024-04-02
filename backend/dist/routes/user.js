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
const client = new client_1.PrismaClient();
const userRouter = express_1.default.Router();
userRouter.use(express_1.default.json());
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAlreadyExists = yield client.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (userAlreadyExists) {
            return res.status(403).json({
                msg: "user already exists"
            });
        }
        const user = yield client.user.create({
            data: {
                email: req.body.email,
                password: req.body.password
            }
        });
        const secret = process.env.JWT_SECRET || "";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret);
        res.status(200).json({
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({
            error: "error while signing up!"
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client.user.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (!user) {
            res.status(403).json({
                msg: "user doesn't exists. Consider signing up"
            });
            return;
        }
        const secret = process.env.JWT_SECRET || "";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret);
        res.status(200).json({
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({
            error: "error while logging in!"
        });
    }
}));
exports.default = userRouter;
