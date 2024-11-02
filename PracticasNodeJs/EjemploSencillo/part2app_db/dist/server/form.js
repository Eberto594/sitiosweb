"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const validation_1 = require("./validation");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await data_1.default.getAllResults(rowLimit),
            helpers: { pass }
        });
    });
    app.post("/form", async (req, resp) => {
        const validation = (0, validation_1.getValidationResults)(req);
        const context = {
            ...req.body,
            validation,
            helpers: { pass }
        };
        if (validation.valid) {
            console.log(await data_1.default.saveResult({ ...req.body }));
            // console.log(validation.valid);
            // console.log("validos");
            resp.render("age", { history: await data_1.default.getAllResults(rowLimit), helpers: { pass } });
        }
        // Los resultados se pasan a la plantilla mediante una propiedad 
        // denominada history, que se utiliza para rellenar la tabla
    });
    app.post("/editar/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        console.log(req.body.name);
        await data_1.default.updateResult({ ...req.body, id: id });
        res.redirect("/form");
    });
    app.post("/borrar/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        await data_1.default.deteleResult(id);
        res.redirect("/form");
    });
};
exports.registerFormRoutes = registerFormRoutes;
const pass = (valid, propname, test) => {
    let propResult = valid?.results?.[propname];
    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
};
