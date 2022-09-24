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
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("./graphql");
require("dotenv/config.js");
const database_1 = require("./database");
const port = process.env.PORT || 9000;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.connectDB();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: () => ({ db }),
    });
    server.applyMiddleware({ app, path: '/api' });
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(`<a href=http://localhost:${port}/api>Navigate to Graphql Playground</a>`));
    });
    // app listening to port
    app.listen(port, () => {
        console.log(` Server running on PORT http://localhost:${port}`);
    });
});
mount(express_1.default());
