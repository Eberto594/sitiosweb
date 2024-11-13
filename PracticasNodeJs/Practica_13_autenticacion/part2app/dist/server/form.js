"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session_helpers_1 = require("./sessions/session_helpers");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    // habilita el middleware de análisis de cookies y especifica la llave secreta que se utilizará para las cookies firmadas.
    app.use((0, cookie_parser_1.default)("mysecret"));
    app.use((0, session_helpers_1.sessionMiddleWare)());
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("data", {
            data: await data_1.default.getAllResults(rowLimit)
        });
    });
    app.post("/form/delete/:id", async (req, res) => {
        const id = Number.parseInt(req.params["id"]);
        await data_1.default.delete(id);
        res.redirect("/form");
        res.end();
    });
    app.post("/form/add", async (req, res) => {
        const nextage = Number.parseInt(req.body["age"] + Number.parseInt(req.body["years"]));
        await data_1.default.saveResult({
            ...req.body,
            nextage
        });
        res.redirect("/form");
        res.end();
    });
};
exports.registerFormRoutes = registerFormRoutes;
