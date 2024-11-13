"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdapter = void 0;
// La función createAdapter<T> crea rutas Express que dependen de los métodos WebService<T> para producir resultados.
function createAdapter(app, ws, baseUrl) {
    app.get(baseUrl, async (req, res) => {
        try {
            res.json(await ws.getMany(req.query));
            res.end();
        }
        catch (err) {
            writeErrorResponse(err, res);
        }
    });
    app.get(`${baseUrl}/:id`, async (req, res) => {
        try {
            const data = await ws.getOne((req.params.id));
            if (data == undefined) {
                res.writeHead(404);
            }
            else {
                res.json(data);
            }
            res.end();
        }
        catch (err) {
            writeErrorResponse(err, res);
        }
    });
    app.post(baseUrl, async (req, res) => {
        try {
            const data = await ws.store(req.body);
            res.json(data);
            res.end();
        }
        catch (err) {
            writeErrorResponse(err, res);
        }
    });
    app.delete(`${baseUrl}/:id`, async (req, res) => {
        try {
            res.json(await ws.detele(req.params.id));
            res.end();
        }
        catch (err) {
            writeErrorResponse(err, res);
        }
    });
    // La nueva ruta hace coincidir las solicitudes con el método PUT, 
    // }extrae el ID de la URL y utiliza el cuerpo de la solicitud para los datos.
    app.put(`${baseUrl}/:id`, async (req, res) => {
        try {
            res.json(await ws.replace(req.params.id, req.body));
            res.end();
        }
        catch (err) {
            writeErrorResponse(err, res);
        }
    });
    app.patch(`${baseUrl}/:id`, async (req, resp) => {
        try {
            resp.json(await ws.modify(req.params.id, req.body));
            resp.end();
        }
        catch (err) {
            writeErrorResponse(err, resp);
        }
    });
    const writeErrorResponse = (err, res) => {
        console.log(err);
        res.writeHead(500);
        res.end();
    };
}
exports.createAdapter = createAdapter;
