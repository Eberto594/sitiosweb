import { Express, Response }  from "express";
import { ValidationError } from "./validation_types";

// La interfaz WebService<T> describe un servicio web 
// que opera en el tipo T, con métodos que describen 
// las operaciones necesarias para admitir las 
// características básicas del servicio web.
export interface WebService<T> {
    getOne(id:any): Promise<T | undefined>;
    getMany(query: any): Promise<T[]>;
    store(data:any): Promise<T | undefined>;
    detele(id: any): Promise<boolean>;
    // El método replace agregado a la interfaz WebService<T> acepta un id y un objeto de datos.
    replace(id: any, data:any): Promise<T | undefined>;
    modify(id:any, data:any): Promise<T | undefined>;
}

// La función createAdapter<T> crea rutas Express que dependen de los métodos WebService<T> para producir resultados.
export function createAdapter<T>(app:Express, ws:WebService<T>, baseUrl: string){
    app.get(baseUrl, async(req, res) => {
        try{
            res.json(await ws.getMany(req.query));
            res.end();
        }
        catch(err){
            writeErrorResponse(err, res);
        }
    });

    app.get(`${baseUrl}/:id`, async(req, res) => {
        try{
            const data = await ws.getOne((req.params.id));

            if(data == undefined){
                res.writeHead(404);
            }
            else{
                res.json(data);
            }
            res.end()
        }
        catch(err){
            writeErrorResponse(err, res);
        }
    });

    app.post(baseUrl, async(req, res) => {
        try{
            const data = await ws.store(req.body);
            res.json(data);
            res.end();
        }
        catch(err){
            writeErrorResponse(err, res);
        }
    });

    app.delete(`${baseUrl}/:id`, async(req, res) => {
        try{
            res.json(await ws.detele(req.params.id));
            res.end();
        }
        catch(err){
            writeErrorResponse(err, res);
        }
    });

    // La nueva ruta hace coincidir las solicitudes con el método PUT, 
    // }extrae el ID de la URL y utiliza el cuerpo de la solicitud para los datos.
    app.put(`${baseUrl}/:id`, async(req, res) => {
        try{
            res.json(await ws.replace(req.params.id, req.body));
            res.end();
        }
        catch(err){
            writeErrorResponse(err, res);
        }
    });

    app.patch(`${baseUrl}/:id`, async (req, resp) => {
        try{
            resp.json(await ws.modify(req.params.id, req.body));
            resp.end();
        }
        catch(err){    
            writeErrorResponse(err, resp) 
        }
        });

    const writeErrorResponse = (err: any, res: Response) => {
        console.log(err);
        res.writeHead(err instanceof ValidationError ? 400 : 500);
        res.end();
    }
}

