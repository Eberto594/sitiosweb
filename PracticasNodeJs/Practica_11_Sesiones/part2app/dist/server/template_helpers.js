"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOdd = exports.increment = exports.valueOrZero = exports.style = void 0;
//La función style acepta el nombre de una hoja de estilo y genera un elemento de enlace para ella
const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
exports.style = style;
//La función valueOrZero verifica si un valor está definido y, si no lo está, devuelve cero.
const valueOrZero = (value) => {
    return value !== undefined ? value : 0;
};
exports.valueOrZero = valueOrZero;
//La función increment incrementa un valor.
const increment = (value) => {
    return Number((0, exports.valueOrZero)(value)) + 1;
};
exports.increment = increment;
//La función isOdd devuelve verdadero si un valor es impar.
const isOdd = (value) => {
    return Number((0, exports.valueOrZero)(value)) % 2;
};
exports.isOdd = isOdd;
