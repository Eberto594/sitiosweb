"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApi = void 0;
const data_1 = __importDefault(require("../data"));
// Este archivo es solo un marcador de posición por ahora, 
// pero se usará para configurar Express para que gestione 
// las solicitudes de la API HTTP
const createApi = (app) => {
    app.get("/api/results", async (req, res) => {
        if (req.query.name) {
            const data = await data_1.default.getResultsByName(req.query.name.toString(), 10);
            if (data.length > 0) {
                res.json(data);
            }
            else {
                res.writeHead(404);
            }
        }
        else {
            res.json(await data_1.default.getAllResults(10));
        }
        res.end();
    });
    // Las nuevas rutas agregan compatibilidad para realizar consultas por ID, almacenar nuevos resultados y eliminar resultados existentes.
    app.all("/api/results/:id", async (req, res) => {
        const id = Number.parseInt(req.params.id);
        if (req.method == "GET") {
            const result = await data_1.default.getResultById(id);
            if (result == undefined) {
                res.writeHead(404);
            }
            else {
                res.json(result);
            }
        }
        else if (req.method == "DELETE") {
            let deleted = await data_1.default.delete(id);
            res.json({ deleted });
        }
        res.end();
    });
    app.post("/api/results", async (req, res) => {
        const { name, age, years } = req.body;
        const nextage = Number.parseInt(age) + Number.parseInt(years);
        const id = await data_1.default.saveResult({ id: 0, name, age, years, nextage });
        res.json(await data_1.default.getResultById(id));
        res.end();
    });
};
exports.createApi = createApi;
