//CODIGO DEL DOCUMENTO DE CONCURRENCIA


// import { IncomingMessage, ServerResponse } from "http";
// //import { readFile } from "fs"; //HANDLER V1 Y V2
// //import { readFile } from "fs/promises";
// //import { read } from "fs";
// import { endPromise, writePromise} from "./promises";
// //import { Count } from "./counter_cb";
// import { Count } from "./count_promise";

// const total = 2_000;
// const iterations = 5;
// let shared_counter = 0;


// //la solicitud es de tipo IncomingMessages
// //la respuesta es de tipo ServerResponse
// // export const handler = (req: IncomingMessage, res:ServerResponse) => {
// //     res.end("Hello World!"); //la respuesta que se mostrara cuadno llegue una solicitud
// // }//HANDLER V1

// // export const handler = (req: IncomingMessage, res:ServerResponse) => {
// //     readFile("data.json", (err: Error | null, data: Buffer) => { //operacion readFile es asincrona
// //         if(err == null){}
// //             res.end(data,() => console.log("File sent")); la arrow function es una callback (devolucion de llamada)
// //         }
// //         else{
// //             console.log(`Error: ${err.message}`);
// //             res.statusCode = 500;
// //             res.end();
// //         }
// //     });
// // }; //HANDLER V2

// // export const handler = (req: IncomingMessage, res: ServerResponse) => {
// //     const p: Promise<Buffer> = readFile("data.json");
// //     p.then((data:Buffer) => res.end(data, () => console.log("File sent"))); //funcion que se ejecuta si se cumple al promesa
// //     p.catch((err: Error) => { //metodo catch para manejar cuando la promesa se rechaza
// //         console.log(`Error: ${err.message}`);
// //         res.statusCode = 500;
// //         res.end();
// //     });
// // }; //HANDLER V3

// // export const handler = (req: IncomingMessage, res: ServerResponse) => {
// //     readFile("data.json")
// //     .then((data:Buffer) => res.end(data,()=>console.log("File sent")))
// //     .catch((err:Error) => {
// //         console.log(`Error: ${err.message}`);
// //         res.statusCode = 500;
// //         res.end();
// //     });
// // };//HANDLER V4

// // export const handler = async (req:IncomingMessage, res: ServerResponse) => {
// //     const data: Buffer = await readFile("data.json");
// //     res.end(data,() => console.log("File sent"));
// // } //USO DE PALABRAS ASYNC Y AWAIT
// // //la palabra async se usa para la funcion que se utiliza para manejar las solicitudes
// // //la palabra await se aplica a las instrucciones que devuelven promeasas

// // export const handler = async(req:IncomingMessage, res:ServerResponse) => {
// //     try{
// //         const data: Buffer = await readFile("data.json");//devuelve una promesa
// //         res.end(data, () => console.log("File sent")); //usa una callback
// //     }
// //     catch(err: any){
// //         console.log(`Error: ${err?.message??err}`);
// //         res.statusCode = 500;
// //         res.end();
// //     }
// // }//HANDLER V5

// // export const handler = async (req: IncomingMessage, res: ServerResponse) => {

// //     try{
// //         const data: Buffer = await readFile("data.json");
// //         //usamos la palabra bind cuando ocupamos la palabra await con al funcion que crea promisify
// //         //el metodo bind asocia el objeto ServerResponse para el cual se invoca la funcion
// //         //el resultado es una nueva funcion, que se invoca al pasar los datos que se enviaran al cliente 
// //         await endPromise.bind(res)(data); 
// //         console.log("File sent");
// //     }
// //     catch(err: any){
// //         console.log(`Error: ${ err?.message ?? err }`);
// //         res.statusCode = 500;
// //         res.end();
// //     }
// // };//HANDLER V6

// // export const handler = async ( req:IncomingMessage, res: ServerResponse ) => {
// //     const request = shared_counter++;
// //     for(let iter = 0; iter < iterations; iter++){
// //         for(let count = 0; count < total; count++){
// //             count++;
// //         }
// //         const msg = `Request: ${request}, Iteration: ${iter}`;
// //         console.log(msg);
// //         await writePromise.bind(res)(msg + "\n");
// //     } //el subproceso principal se bloquea hasta que ambos ciclos se hayan completado
// //     await endPromise.bind(res)("Done");
// // }//HANDLER V7

// // export const handler = async ( req: IncomingMessage, res: ServerResponse ) => {
// //     const request = shared_counter++;
    
// //     const iterate = async ( iter: number = 0 ) => {
// //         for(let count = 0; count < total; count++){
// //             count++;
// //         }

// //         const msg = `Request: ${request}, Iterator: ${(iter)}`;
// //         console.log(msg);
// //         await writePromise.bind(res)(msg + "\n");
// //         if(iter == iterations - 1){
// //             await endPromise.bind(res)("Done");
// //         }
// //         else{
// //             // funcion para que Node agregue una funcion a cola de callbacks
// //             setImmediate(() => iterate(++iter)); 
// //         }
// //     }
// //     iterate(); //realiza un bloque de conteo y luego usa la funcion setImmediate para diferir el siguiente bloque 
// // }; HANDLER V8

// // export const handler = async ( req:IncomingMessage, res:ServerResponse ) => {
// //     const request = shared_counter++;

// //     //subproceso de trabajo recibe el archivo del codigo JS y un objeto de configuracion
// //     //__dirname tiene el nombre del directorio que contiene l moduelo actual
// //     const worker = new Worker(__dirname + "/count_worker.js", {
// //         workerData: {
// //         iterations,
// //         total,
// //         request
// //         }
// //     });

// //     // Los subprocesos de trabajo se comunican con el subproceso principal mediante 
// //     // la emisión de eventos, que son manejados por funciones registradas por el método on
// //     worker.on("message", async(iter: number) => {
// //         const msg = `Request: ${request}, Iterations: ${(iter)}`;
// //         console.log(msg);
// //         await writePromise.bind(res)(msg + "\n");
// //     });

// //     //primer argumento es el nombre del evento que sera ejecutado
// //     //el evento proporciona un código de salida que indica si el subproceso de trabajo
// //     // terminó normalmente o fue finalizado con un error
// //     worker.on("exit", async(code:number) => {
// //         if(code == 0)
// //             await endPromise.bind(res)("Done");
// //         else{
// //             res.statusCode = 500;
// //             await res.end();
// //         }
// //     });



// //     // También hay un evento de error, que se envía si el código JavaScript ejecutado por
// //     // el subproceso de trabajo arroja una excepción no detectada.
// //     worker.on("error", async (err) =>{
// //         console.log(err);
// //         res.statusCode = 500;
// //         await res.end();
// //     });
// // };//HANDLER V9

// // export const handler = async ( req:IncomingMessage, res:ServerResponse ) => {
// //     const request = shared_counter++;

// //     Count(request, iterations, total, async(err, update) => {
// //         if(err !== null){
// //             console.log(err);
// //             res.statusCode = 500;
// //             await res.end();
// //         }
// //         else if(update !== true){
// //             const msg = `Request: ${request}, Iteration: ${(update)}`;
// //             console.log(msg);
// //             await writePromise.bind(res)(msg + "/n");
// //         }
// //         else{
// //             await endPromise.bind(res)("Done");
// //         }
// //     })
// // }//HANDLER V10


// //la respuesta enviada al cliente no incluye ningún
// //mensaje generado al final de cada bloque de trabajo
// export const handler = async(req: IncomingMessage, res:ServerResponse) => {
//     const request = shared_counter++;

//     try{
//         await Count(request, iterations, total);
//         const msg = `Request: ${request}, Iterations: ${(iterations)}`;
//         await writePromise.bind(res)(msg + "\ n");
//         await endPromise.bind(res)("Done");
//     }
//     catch(err: any){
//         console.log(err);
//         res.statusCode = 500;
//         res.end();
//     }
// };//HANDLER V11

// //CODIGO DEL DOCUMENTO MANEJO DE SOLICITUDES HTTP
// import { IncomingMessage, ServerResponse } from "http";
// // import { URL } from "url";
// // import { TLSSocket } from "tls";
// import { Request, Response} from "express";

// // export const handler = async (req:IncomingMessage, resp:ServerResponse) => {
// //     resp.end("Hello World");
// // }//HANDLER V1

// // export const handler = async(req:IncomingMessage, res:ServerResponse) => {
// //     console.log(`----HTTP Method: ${req.method}, URL: ${req.url}`);
// //     // console.log(`host: ${req.headers.host}`);//HANDLER V2
// //     // console.log(`accept: ${req.headers.accept}`);//HANDLER V2
// //     // console.log(`user-agent: ${req.headers["user-agent"]}`);//HANDLER V2

// //     const parsedURL = new URL(req.url??"",`http://${req.headers.host}`);
// //     console.log(`protocol: ${parsedURL.protocol}`);
// //     console.log(`hostname: ${parsedURL.hostname}`);
// //     console.log(`port: ${parsedURL.port}`);
// //     console.log(`pathname: ${parsedURL.pathname}`);
// //     parsedURL.searchParams.forEach((val, key) =>{
// //         console.log(`Search param: ${key}: ${val}`)
// //     });

// //     res.end("Hello World");
// // }//HANDLER V3

// // export const handler = async(req:IncomingMessage, res:ServerResponse) => {
// //     const parsedURL = new URL(req.url??"",`http://${req.headers.host}`);
// //     if(req.method !== "GET" || parsedURL.pathname == "/favicon.ico"){
// //         res.writeHead(404, "Not found");
// //         res.end();
// //         return;
// //     }
// //     else{
// //         res.writeHead(200, "OK");
// //         if(!parsedURL.searchParams.has("keyword")){
// //             res.write("Hello, HTTP");
// //         }
// //         else{
// //             res.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
// //         }
// //         res.end();
// //         return;
// //     }
// // };//HANDLER V4

// // export const isHttps = (req: IncomingMessage): boolean => {
// //     return req.socket instanceof TLSSocket && req.socket.encrypted;
// // }

// export const redictionHandler = (req:IncomingMessage, resp:ServerResponse) => {
//     resp.writeHead(302, { //codigo 302 significa encontrado, pero hace referencia a una locacion temporal
//         "Location":"https://localhost:5500/redireccionado"
//     });
//     resp.end();
// }

// export const newRediction = (req:Request, resp: Response) => {
//     const msg = req.params.message?? "has sido redireccionado a una conexion segura";
//     resp.send(`Hello, ${msg}`);
// }

// export const notFoundHandler = (req:Request, res:Response) => {
//     // res.writeHead(404, "Not Found");
//     // res.end();
//     res.sendStatus(404);//codigo de elemento no encontrado
// }

// export const newUrlHandler = (req:Request, res:Response) =>{
//     // res.writeHead(200, "OK");
//     // res.write("Hello, New URL");
//     // res.end();
//     const msg = req.params.message?? "Has cambiado de pagina";
//     res.send(`${msg}`);
// }

// export const defaultHandler = (req:Request, res:Response) => {
//     // res.writeHead(200, "OK");
//     // const protocol = isHttps(req)?"https":"http";
//     // const parsedURL = new URL(req.url??"", `${protocol}://${req.headers.host}`);
//     // if(!parsedURL.searchParams.has("keyword")){
//     //     res.write(`Hello, ${protocol.toLocaleUpperCase}`);
//     // }
//     // else{
//     //     res.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
//     // }
//     // res.end();
//     if(req.query.keyword){
//         res.send(`Hello ${req.query.keyword}, bienvenido de vuelta`);
//     }
//     else{
//         res.send(`Hola, has ingresado por el protocolo ${req.protocol.toUpperCase()} directamente`);
//     }
// }

// // export const handler = (req:IncomingMessage, res:ServerResponse) => {
// //     const protocol = isHttps(req)?"https":"http";

// //     const parsedURL = new URL(req.url??"", `${protocol}://${req.headers.host}`);

// //     if(req.method !== "GET" || parsedURL.pathname == "/favicon.ico"){
// //         res.writeHead(404, "Not Found");
// //         res.end();
// //         return;
// //     }
// //     else{
// //         res.writeHead(200, "OK");
// //         if(!parsedURL.searchParams.has("keyword")){
// //             res.write(`Hello, ${protocol.toUpperCase()}`);
// //         }
// //         else{
// //             res.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
// //         }
// //         res.end();
// //         return;
// //     }
// // };

//CODIGO DEL DOCUMENTO DE FLUJOS
import { IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";

// export const basicHandler = (req:IncomingMessage, res:ServerResponse) => {
//     for(let i = 0; i < 10; i++)
//         res.write(`Message: ${i}\n`);

//     res.end(`End`);
// }V1

// export const basicHandler = (req:IncomingMessage, res:ServerResponse) => {
//     res.setHeader("Content-Type", "text/plain");//se especifica el encabezado
//     for(let i = 0; i < 10; i++)
//         res.write(`Message: ${i}\n`);

//     res.end(`End`);
// }//V2

// export const basicHandler = (req:IncomingMessage, res:ServerResponse) => {
//     res.setHeader("Content-Type", "text/plain");
//     for(let i = 0; i < 10_000; i++){
//        if(res.write(`Message: ${i}\n`)){
//         console.log("Stream buffer is at capacity");
//        }
//     }

//     res.end(`End`);
// };V3

// export const basicHandler = (req:IncomingMessage, res:ServerResponse) => {
//     res.setHeader("Content-Type", "text/plain");

//     let i = 0;
//     let canWrite = true;

//     const writeData = () => {
//         console.log("Started writing data");
//         do{
//             canWrite = res.write(`Message: ${i++}\n`); //este metodo devuelve true o false para saber si se puede escribir o no en el flujo
//         }while(i < 10_000 && canWrite);

//         console.log("Buffer is at capacity");

//         if(1 < 10_000){
//             res.once("drain", () => { //metodo once para registrar un controalador que se invocara cuando se ejecute el evento drain
//                 console.log("Buffer has been drained");//se imprime el mensaje de vaciado
//                 writeData();//se vuelve a llamar a si misma para volver a escribir en el flujo
//             });
//         }
//         else{
//             res.end("End");
//         }
//     }

//     writeData();
// }//V4

export const basicHandler = (req:IncomingMessage, res:ServerResponse) => {
    res.write(readFileSync("static/index.html"));// este metodo escribe lo que hay en el archivo al flujo
    res.end();//este metodo indica que se termino de escribir el flujo y se va a enviar al lector
}
