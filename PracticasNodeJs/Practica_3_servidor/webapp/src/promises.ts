import { ServerResponse } from "http";
import { promisify } from "util";

//funcion que devuelve una promesa
//se ocupa la palabra "as" para anular el tipo inferido con una descripcion de los parametros del metodo y resultado
export const endPromise = promisify(ServerResponse.prototype.end) as ( data: any ) => Promise<void>;

//metodo de escritura definido por la clase ServerResponse en uan promesa
//(creo que es para no bloquear el hilo principal)
export const writePromise = promisify(ServerResponse.prototype.write) as ( data: any ) => Promise<void>;