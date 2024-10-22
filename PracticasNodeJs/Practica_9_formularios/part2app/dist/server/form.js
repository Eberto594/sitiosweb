"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("./validation");
// import { helpers } from "handlebars";
// import multer from "multer";
// import { sanitizeValue } from "./sanitize";
//debes decirle dónde puede almacenar los archivos que recibe
//en este caso, en memoria, sin embago, se puede hacer en disco
// const fileMiddleware = multer({storage: multer.memoryStorage()});
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    // app.get("/form", (req, res) => {
    //     //Express decodifica cadenas de consulta de URL y las presenta a través de la propiedad Request.query.
    //     for(const key in req.query){
    //         res.write(`${key}: ${req.query[key]} \n`);
    //     }
    //     res.end();
    // });
    app.get("/form", (req, res) => {
        res.render("age", { helpers: { pass } });
    });
    //paquete Multer se aplica a rutas específicas para evitar
    //que los usuarios maliciosos carguen archivos en rutas donde no se esperan:
    // app.post("/form", fileMiddleware.single("datafile"), (req, res) => {
    //     // res.setHeader("Content-Type", "text/html");
    //     // for(const key in req.body){
    //     //     res.write(`<div>${key}:${sanitizeValue(req.body[key])}</div>`);
    //     // }
    //     // if(req.file){
    //     //     res.write(`<div>---\nFile: ${req.file.originalname}</div>`);
    //     //     res.write(`<div>${sanitizeValue(req.file.buffer.toString())}</div>`);
    //     // }
    //     // res.end();
    //     res.render("formData", {
    //         ...req.body, file: req.file,
    //         fileData: req.file?.buffer.toString()
    //     });
    // });
    // app.post("/form", (req, res) =>{
    //     res.render("age", {
    //         ...req.body,
    //         nextage: Number.parseInt(req.body.age) + 1
    //     });
    // });
    app.post("/form", (0, validation_1.validate)("name").required().minLength(5), (0, validation_1.validate)("age").isInteger(), (req, resp) => {
        const validation = (0, validation_1.getValidationResults)(req);
        const context = {
            ...req.body, validation,
            helpers: { pass }
        };
        if (validation.valid) {
            context.nextage = Number.parseInt(req.body.age) + 1;
        }
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
const pass = (valid, propname, test) => {
    let propResult = valid?.results?.[propname];
    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
};
