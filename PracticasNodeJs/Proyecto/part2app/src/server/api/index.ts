import { Express } from "express";
// import repository from "../data";
import { createAdapter } from "./http_adapter";
import { ResultWebService } from "./results_api";
import { Validator } from "./validation_adapter";
import { ResultWebServiceValidation } from "./results_api_validation";
import { FeathersWrapper } from "./feathers_adapter";
import { feathers } from "@feathersjs/feathers";
import feathersExpress, { rest } from "@feathersjs/express";
import { ValidationError } from "./validation_types";
import { roleHook } from "../auth";
import passport from "passport";


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
export const createApi = (app: Express) => {
    // createAdapter(app, new ResultWebService(), "/api/results");
    // createAdapter(app, new Validator(new ResultWebService(), ResultWebServiceValidation), "/api/results");
    const feathersApp = feathersExpress(feathers(), app).configure(rest());

    const service = new Validator(new ResultWebService(), ResultWebServiceValidation);

    // feathersApp.use('/api/results', new FeathersWrapper(service));
    // feathersApp.use("/api/results", (req, res, next) => {
    //     req.feathers.user = req.user;
    //     req.feathers.authenticated = req.authenticated;
    //     next();
    // }, new FeathersWrapper(service));
    
    feathersApp.use('/api/results', passport.authenticate("jwt", {session: false}), (req, res, next) => {
        req.feathers.user = req.user;
        req.feathers.authenticated = req.authenticated = req.user !== undefined;
        next();
    }, new FeathersWrapper(service));

    feathersApp.hooks({
        error: {
            all: [(ctx) => {
                if(ctx.error instanceof ValidationError){
                    ctx.http = {status: 400};
                    ctx.error = undefined;
                }
            }]
        },
        // La propiedad before se usa para registrar ganchos que se invocan antes
        // de que se invoque un método de servicio web, y los métodos create, remove,
        // update y patch están protegidos por ganchos que requieren el rol Users o Admins
        before: {
            create: [roleHook("Users")],
            remove:[roleHook("Admins")],
            update: [roleHook["Admins"]],
            patch: [roleHook("Admins")]
        }
    });
}