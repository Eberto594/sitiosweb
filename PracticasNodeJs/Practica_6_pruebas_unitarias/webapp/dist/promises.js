"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePromise = exports.endPromise = void 0;
const http_1 = require("http");
const util_1 = require("util");
//funcion que devuelve una promesa
//se ocupa la palabra "as" para anular el tipo inferido con una descripcion de los parametros del metodo y resultado
exports.endPromise = (0, util_1.promisify)(http_1.ServerResponse.prototype.end);
//metodo de escritura definido por la clase ServerResponse en uan promesa
//(creo que es para no bloquear el hilo principal)
exports.writePromise = (0, util_1.promisify)(http_1.ServerResponse.prototype.write);
