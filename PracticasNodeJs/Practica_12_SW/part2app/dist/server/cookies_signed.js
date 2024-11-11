"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCookie = exports.signCookie = void 0;
const crypto_1 = require("crypto");
const signCookie = (value, secret) => {
    // La función createHmac se utiliza para crear el generador de 
    // código hash, utilizando el algoritmo SHA-512 y la llave secreta
    // El método update se utiliza para aplicar el algoritmo hash al valor 
    // de la cookie, y el método digest devuelve el código hash en la codificación 
    // URL Base64, lo que permite que el código hash se incluya de forma segura en la cookie
    return value + "." + (0, crypto_1.createHmac)("sha512", secret).update(value).digest("base64url");
};
exports.signCookie = signCookie;
// el método validationCookie genera un nuevo código hash para el valor de la cookie 
// y lo compara con el que se recibió en la cookie
const validateCookie = (value, secret) => {
    const cookieValue = value.split(".")[0];
    const compareBuf = Buffer.from((0, exports.signCookie)(cookieValue, secret));
    const candidateBuf = Buffer.from(value);
    if (compareBuf.length == candidateBuf.length && (0, crypto_1.timingSafeEqual)(compareBuf, candidateBuf)) {
        return cookieValue;
    }
    return undefined;
};
exports.validateCookie = validateCookie;
