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
const rowLimit = 69;
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
        if (!resp.locals.user) {
            return resp.redirect("/signin");
        }
        let nombreAlumno = resp.locals.user;
        resp.render("data", {
            // data: await repository.getAllResults(rowLimit),
            data: await data_1.default.getMaterias(rowLimit)
        });
        // console.log(resp.locals.user);
        // console.log(await repository.getUsuarios(rowLimit))
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
};
exports.registerFormRoutes = registerFormRoutes;
