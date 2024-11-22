"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
// La clase ValidationError representa un problema al validar los datos enviados por el cliente en una solicitud.
class ValidationError {
    name;
    message;
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    stack;
    cause;
}
exports.ValidationError = ValidationError;
