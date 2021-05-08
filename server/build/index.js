"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 9000;
app.get("/", (req, res) => {
    res.send("Typescript from Server 1");
});
app.listen(port, () => {
    console.log(` Server running on PORT http://localhost:${port}`);
});
