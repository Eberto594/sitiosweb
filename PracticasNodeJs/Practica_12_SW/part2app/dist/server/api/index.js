"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
// import repository from "../data";
const http_adapter_1 = require("./http_adapter");
const results_api_1 = require("./results_api");
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
    (0, http_adapter_1.createAdapter)(app, new results_api_1.ResultWebService(), "/api/results");
};
exports.createApi = createApi;
