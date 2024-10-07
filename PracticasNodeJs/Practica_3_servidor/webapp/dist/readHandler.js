"use strict";
//nuevo manejador que se utilizará para leer los datos enviados por el navegador
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
// export const readHandler = (req:IncomingMessage, res:ServerResponse) => {
//     req.setEncoding("utf-8");
//     req.on("data", (data:string) =>{ //evento data se emite cuando los datos estan disponibles para ser leidos en el flujo
//         console.log(data);//los datos se pasan a esta callback con forma de Buffer, un arreglo de bytes sin signo
//     });
//     req.on("end", () => { //evneto final se emite cuando se han leido todos los datos de la secuencia 
//         console.log("End: alL data read");
//         res.end();
//     });
// }//V1
// export const readHandler = async(req:IncomingMessage, res:ServerResponse) => {
//     req.setEncoding("utf-8"); //se establece la codificacion
//     for await (const data of req){ //aunque se ocupe await, el for lee los datos del flujo hasta que se consumen todos
//         console.log(data);
//     }
//     console.log("End: all data read");
//     res.end();
// }//V2
// export const readHandler = async(req:IncomingMessage, res:ServerResponse) => {
//     //es para transmitir un flujo a otro
//     req.pipe(res); //Este metodo pasa el flujo (Readable) a un flujo Writeable. Garantiza que todos los datos se lean del Readable
//     //y se escriban en el Writeable sin mas intervencion
// }//V3
//la clase Transform es para crear objetos que reciben datos de un flujo de lectura, los procesan y luego los pasan
// export const readHandler = async(req:IncomingMessage, res:ServerResponse) => {
//     req.pipe(createLowerTransform()).pipe(res);
// }
// //El constructor recibe un objeto cuyo valor de la propiedad transform es una funcion que se invocara cuando haya datos que procesar
// //recibe tres argumentos; fragmento de datos a procesar, tipo de codificacion de cadena, y una callback para pasar los datos procesados
// const createLowerTransform = () => new Transform ({
//     transform(data, encoding, callback){
//         //el primer argumento es un obejto que representa cualquier error que haya ocurrido 
//         callback(null, data.toString().toLowerCase());//pasa la informacion que se obtiene a letras en minusculas
//     }
// });//V4
// export const readHandler = async(req:IncomingMessage, res:ServerResponse) => {
//     if(req.headers["content-type"] == "aplication/json"){ //evaluar si la carga util es de tipo JSON
//         req.pipe(createFromJsonTransform()).on("data",(payload) => {//se usa el transformador para analizar los datos
//             //son recibimos por el controlador de la solicitud mediante el evento de datos
//             if(payload instanceof Array){ //se evalua si carga es un arreglo 
//                 res.write(`Received an array with ${payload.length} items`) // se genera un respuesta con al longitud
//             }
//             else{
//                 res.write("Did not receive an array"); //no se recibe un arreglo
//             }
//             res.end(); // se ejecuta el metodo para terminar el flujo
//         });
//     }
//     else{
//         req.pipe(res); // si no es un json se regresa la misma informacion
//     }
// }
// const createFromJsonTransform = () => new Transform ({
//     readableObjectMode: true,
//     transform(data, encoding, callback){
//         callback(null, JSON.parse(data));
//     }
// }); //V5
const readHandler = async (req, res) => {
    if (req.headers["content-type"] == "application/json") {
        const payload = req.body;
        if (payload instanceof Array) {
            res.json({ arraySize: payload.length });
        }
        else {
            res.write("Did not received an array");
        }
        res.end();
    }
    else {
        req.pipe(res);
    }
};
exports.readHandler = readHandler;
// REQUESITOS DE PROYECTO BASICO
// peticiones
// archivos
// al servidor 
// - AGENDA
// - PUNTO DE VENTA
// BBASE DE DATOS EN JSON
