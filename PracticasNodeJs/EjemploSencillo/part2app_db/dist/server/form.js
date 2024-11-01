"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await data_1.default.getAllResults(rowLimit)
        });
    });
    app.post("/form", async (req, resp) => {
        await data_1.default.saveResult({ ...req.body });
        const context = {
            ...req.body,
            history: await data_1.default.getAllResults(rowLimit)
        };
        // Los resultados se pasan a la plantilla mediante una propiedad 
        // denominada history, que se utiliza para rellenar la tabla
        resp.render("age", context);
    });
    app.post("/editar/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        console.log(req.body.name);
        await data_1.default.updateResult({ ...req.body, id: id });
        res.redirect("/form");
    });
};
exports.registerFormRoutes = registerFormRoutes;
