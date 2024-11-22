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
const auth_1 = require("./auth");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    // habilita el middleware de análisis de cookies y especifica la llave secreta que se utilizará para las cookies firmadas.
    app.use((0, cookie_parser_1.default)("mysecret"));
    // app.use(customSessionMiddleWare());
    app.use((0, session_helpers_1.sessionMiddleWare)());
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("data", {
            data: await data_1.default.getAllResults(rowLimit),
        });
    });
    // la ruta /form/delete/:id está restringida al rol Administradores (Admins).
    app.post("/form/delete/:id", (0, auth_1.roleGuard)("Admins"), async (req, res) => {
        const id = Number.parseInt(req.params["id"]);
        await data_1.default.delete(id);
        res.redirect("/form");
        res.end();
    });
    // La ruta /form/add está restringida al rol Usuarios (Users),
    app.post("/form/add", (0, auth_1.roleGuard)("Users"), async (req, res) => {
        const nextage = Number.parseInt(req.body["age"]) + Number.parseInt(req.body["years"]);
        await data_1.default.saveResult({ ...req.body, nextage });
        res.redirect("/form");
        res.end();
    });
    // app.post("/form", async (req, res) => {
    //     const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
    //     await repository.saveResult({...req.body, nextage});
    //     // let pHistory = [{
    //     //     name: req.body.name,
    //     //     age: req.body.age,
    //     //     years: req.body.years,
    //     //     nextage},
    //     //     ...(getJsonCookie(req, "personalHistory") || [])
    //     // ].splice(0,5);
    //     // setJsonCookie(res, "personalHistory", pHistory);
    //     req.session.personalHistory = [{
    //         id: 0, name: req.body.name, age: req.body.age,
    //         years: req.body.years, nextage},
    //         ...(req.session.personalHistory || [])].splice(0, 5);
    //         const context = {
    //             ...req.body, nextage,
    //             history: await repository.getAllResults(rowLimit),
    //             personalHistory: req.session.personalHistory
    //             };
    //         // Los resultados se pasan a la plantilla mediante una propiedad 
    //         // denominada history, que se utiliza para rellenar la tabla
    //         res.render("age", context);
    // });
};
exports.registerFormRoutes = registerFormRoutes;
