"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
const results_api_1 = require("./results_api");
const validation_adapter_1 = require("./validation_adapter");
const results_api_validation_1 = require("./results_api_validation");
const feathers_adapter_1 = require("./feathers_adapter");
const feathers_1 = require("@feathersjs/feathers");
const express_1 = __importStar(require("@feathersjs/express"));
const validation_types_1 = require("./validation_types");
const auth_1 = require("../auth");
const passport_1 = __importDefault(require("passport"));
// Este archivo es solo un marcador de posición por ahora, 
// pero se usará para configurar Express para que gestione 
// las solicitudes de la API HTTP
// export const createApi = (app: Express) => {
//     app.get("/api/results", async (req, res) => {
//         if(req.query.name){
//             const data = await repository.getResultsByName(req.query.name.toString(), 10);
//             if(data.length > 0){
//                 res.json(data);
//             }
//             else{
//                 res.writeHead(404);
//             }   
//         }
//         else{
//             res.json(await repository.getAllResults(10));
//         }
//         res.end();
//     });
//     // Las nuevas rutas agregan compatibilidad para realizar consultas por ID, almacenar nuevos resultados y eliminar resultados existentes.
//     app.all("/api/results/:id", async(req, res)=> {
//         const id = Number.parseInt(req.params.id);
//         if(req.method == "GET"){
//             const result = await repository.getResultById(id);
//             if(result == undefined){
//                 res.writeHead(404);
//             }
//             else{
//                 res.json(result);
//             }
//         }
//         else if(req.method == "DELETE"){
//             let deleted = await repository.delete(id);
//             res.json({deleted});
//         }
//         res.end();
//     })
//     app.post("/api/results", async(req, res)=> {
//         const { name, age, years } = req.body;
//         const nextage = Number.parseInt(age) + Number.parseInt(years);
//         const id = await repository.saveResult({id: 0, name, age, years, nextage});
//         res.json(await repository.getResultById(id));
//         res.end();
//     });
// }
// No hay cambios en el comportamiento del servicio web, pero eliminar el código 
// que se ocupa de las solicitudes y respuestas HTTP hace que el servicio web sea más fácil de entender y mantener.
const createApi = (app) => {
    // createAdapter(app, new ResultWebService(), "/api/results");
    // createAdapter(app, new Validator(new ResultWebService(), ResultWebServiceValidation), "/api/results");
    const feathersApp = (0, express_1.default)((0, feathers_1.feathers)(), app).configure((0, express_1.rest)());
    const service = new validation_adapter_1.Validator(new results_api_1.ResultWebService(), results_api_validation_1.ResultWebServiceValidation);
    // feathersApp.use('/api/results', new FeathersWrapper(service));
    // feathersApp.use("/api/results", (req, res, next) => {
    //     req.feathers.user = req.user;
    //     req.feathers.authenticated = req.authenticated;
    //     next();
    // }, new FeathersWrapper(service));
    feathersApp.use('/api/results', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => {
        req.feathers.user = req.user;
        req.feathers.authenticated = req.authenticated = req.user !== undefined;
        next();
    }, new feathers_adapter_1.FeathersWrapper(service));
    feathersApp.hooks({
        error: {
            all: [(ctx) => {
                    if (ctx.error instanceof validation_types_1.ValidationError) {
                        ctx.http = { status: 400 };
                        ctx.error = undefined;
                    }
                }]
        },
        // La propiedad before se usa para registrar ganchos que se invocan antes
        // de que se invoque un método de servicio web, y los métodos create, remove,
        // update y patch están protegidos por ganchos que requieren el rol Users o Admins
        before: {
            create: [(0, auth_1.roleHook)("Users")],
            remove: [(0, auth_1.roleHook)("Admins")],
            update: [auth_1.roleHook["Admins"]],
            patch: [(0, auth_1.roleHook)("Admins")]
        }
    });
};
exports.createApi = createApi;
