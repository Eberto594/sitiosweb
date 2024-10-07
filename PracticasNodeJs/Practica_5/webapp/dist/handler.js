"use strict";
//CODIGO DEL DOCUMENTO DE CONCURRENCIA
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const fs_1 = require("fs");
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
const basicHandler = (req, res) => {
    res.write((0, fs_1.readFileSync)("static/index.html")); // este metodo escribe lo que hay en el archivo al flujo
    res.end(); //este metodo indica que se termino de escribir el flujo y se va a enviar al lector
};
exports.basicHandler = basicHandler;
