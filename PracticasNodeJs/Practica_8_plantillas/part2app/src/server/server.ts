import { createServer } from "http";
import express, {Express} from "express";
import { testHandler } from "./testHandler";
import httpProxy from "http-proxy";
import helmet from "helmet";
import { registerCustomTemplateEngine } from "./custom_engine"

const port = 5000;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100",
    ws: true
});

//se configura el motor de plantillas personalizado
registerCustomTemplateEngine(expressApp);
//De manera predeterminada,Express busca archivos de plantilla en la carpeta views.
expressApp.set("views", "templates/server");


expressApp.use(helmet());
expressApp.use(express.json());

//El método get crea una ruta que coincide con las rutas que 
//comienzan con /dynamic y captura el siguiente segmento de
//ruta hasta un parámetro de ruta llamado file
expressApp.get("/dynamic/:file", (req, res) => {
    //método Response.render, que es responsable de representar una plantilla.
    //primer parametro: nombre del archivo de plantilla
    //segundo parametro: objeto de contexto para generar contenido
    res.render(`${req.params.file}.custom`, {message: "Hello template"});
})

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));

expressApp.post("/test", testHandler);


const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, () => console.log(`HTTP server listening on port ${port}`));