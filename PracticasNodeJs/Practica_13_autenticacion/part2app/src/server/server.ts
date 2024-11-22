import { createServer } from "http";
import express, {Express} from "express";
import httpProxy from "http-proxy";
import helmet from "helmet";
import { engine } from "express-handlebars";
import { registerFormMiddleware, registerFormRoutes } from "./form";
import { createApi } from "./api";
import { createAuth } from "./auth";

const port = 5000;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100",
    ws: true
});

expressApp.set("views", "templates/server");

expressApp.engine("handlebars", engine());
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
// El middleware JSON acepta un objeto de configuración cuya 
// propiedad type se puede configurar con un arreglo de tipos de contenido para decodificar
expressApp.use(express.json({
    type: ["application/json", "application/json-patch+json"]
}));
registerFormMiddleware(expressApp);
// El método createAuth se llama después de que se configuran los 
// componentes de middleware requeridos por los formularios, pero 
// antes del resto de la aplicación. Esto permite que los controladores 
// de solicitudes de autenticación dependan de las características 
// descritas anteriormente para los formularios, como la decodificación 
// de datos de formulario y el uso de sesiones.
createAuth(expressApp);
registerFormRoutes(expressApp);

createApi(expressApp);
expressApp.use("^/$", (req, res) => res.redirect("/form"));
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));


const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, () => console.log(`HTTP server listening on port ${port}`));