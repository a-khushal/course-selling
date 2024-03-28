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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const edge_1 = require("@prisma/client/edge");
const prisma = new edge_1.PrismaClient();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("hi");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
            }
        });
        if (!process.env.JWT_SECRET) {
            res.status(403).json({
                error: "jwt is not defined"
            });
            return;
        }
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SCERET || "");
        res.status(200).json({
            msg: token
        });
    }
    catch (err) {
        console.log(err);
        res.status(403).json({
            error: "error while signing up!"
        });
    }
}));
app.listen(8000, () => {
    console.log("listening to port 8000");
});
