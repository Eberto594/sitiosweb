"use strict";
//CODIGO DE DOCUMENTO DE CONCURRENCIA 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createServer } from "http"; //modulo para servidor
// import { handler } from "./handler"; //modulo para manera el servidor, este archivo es el que creamos
// const port = 5000; //puerto a utilizar
// // const server = createServer(handler); //creacion de servidor y con el handler como parametro
// // server.listen(port, function(){
// //     console.log(`Server listening on port ${port}`); //Server listening on port 5000
// // }); //Cuando llega la solicitud esta funcion se va a ejecutar SERVIDOR V1
// const server = createServer();
// //la funcion on() recibe el evento que se espera que se ejecute y la callback (devolucion de llamada) 
// //que se invocara cada vez que se emita el evento especificado
// // server.on("request", handler); //v1 
// server.on("request", (req, res) => {
//     //se evita hacer la peticion para el icono que se muestra en la pestaña de la pagina
//     if(req.url?.endsWith("favicon.icon")){
//         res.statusCode = 404;
//         res.end();
//     }
//     else{
//         handler(req, res);
//     }
// });
// server.listen(port);
// server.on("listening", ()=>{
//     console.log(`(Event) Server listening on port ${port}`);
// });
// //CODIGO DE DOCUMENTO DE MANEJO DE SOLICITUDES HTTP
// import { createServer } from "http";
// import { redictionHandler, newUrlHandler, defaultHandler, notFoundHandler, newRediction } from "./handler";
// import { createServer as createHttpsServer } from "https";
// import { readFileSync } from "fs";
// import express, { Express } from "express";
// const port = 5000;
// const https_port = 5500;
// // const server = createServer();
// // server.on("request", handler);
// // server.listen(port);
// // server.on("listening", () => {
// //     console.log(`(Event) Server is listening on port ${port}`);
// // })SERVIDOR V1
// // const server = createServer(handler);
// // server.listen(port, () => console.log(`(Event) Server listening on port ${port}`));
// // const httpsConfig = {
// //     key: readFileSync("key.pem"),
// //     cert: readFileSync("cert.pem")
// // };
// // const httpsServer = createHttpsServer(httpsConfig, handler);
// // httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
// // // server.on("listen", ()=>{
// // //     console.log(`(Event) server listening on port ${port}`)
// // // })
// const server = createServer(redictionHandler);//creamos un servidor HTTP para redirigir a HTTPS
// server.listen(port, () => console.log(`(Event) Server is listening on port ${port}`)); //mensaje de encendido
// const httpsConfig = {
//     key: readFileSync("key.pem"),
//     cert: readFileSync("cert.pem")
// }; //llaves necesarias para la creacion del servidor HTTPS
// const expressApp: Express = express(); //servidor encargado de las solicitudes
// expressApp.get("/favicon.ico", notFoundHandler); //metodo get para la busqueda el icono de la pagina
// expressApp.get("/newurl/:message?", newUrlHandler);//metodo para cuando se tenga una nueva url
// expressApp.get("/redireccionado:message?", newRediction);//metodo para cuando se ingrese por HTTP y se redireccione a HTTPS
// expressApp.get("*", defaultHandler);//metodo para cuando no se coincida con los otros metodos anteriores
// const httpsServer = createHttpsServer(httpsConfig, expressApp); //creacion del servidor HTTPS
// httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${port}`)); //mensaje de inicializacion del servidor
//CODIGO DEL DOCUMENTO DE FLUJOS
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
// import { basicHandler } from "./handler";
const readHandler_1 = require("./readHandler");
const port = 5000;
//esta creacion permite el metodo static que crea el componente de middleware que sirve archivos staticos
const expressApp = (0, express_1.default)();
//el middleware son controladores de solicitudes que pueden inspeccionar e interceptar todas las solicitudes HTTP que recibe el servidor
expressApp.use(express_1.default.json()); //midware para los json
// expressApp.get("/favicon.ico", (req, res) => {
//     res.statusCode = 404;
//     res.end();
// });
// expressApp.get("*",  basicHandler);
expressApp.post("/read", readHandler_1.readHandler);
expressApp.get("/sendcity", (req, res) => {
    //se utiliza cuando se necesita responder con el contenido de un archivo 
    //recibe el nombre y un objeto de configuracion, cuya propiedad raiz especifica el directorio que contiene el archivo
    res.sendFile("city.jpg", { root: "static" });
});
expressApp.get("/downloadcity", (req, res) => {
    //este metodo establece el encabezado Content-Disposition, que obliga al navegador a tratar al archivo como 
    //una descarga que debe guardarse
    res.download("static/city.jpg");
});
expressApp.get("/json", (req, res) => {
    //decodifica automaticamente los cuerpos de respuesta JSON, 
    //este metodo acepta un objeto que se realiza a JSON y se usa como cuerpo de respuesta
    res.json("{name:Ebr");
});
//el metodo static recibe como parametro el directorio que contiene archivos, que tambien se denominan static
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP server listening on port ${port}`));
