"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModelValidation = exports.ResultWebServiceValidation = void 0;
const validator_1 = __importDefault(require("validator"));
// La ValidationRule denominada intValidator describe 
// la validación de valores enteros, con una propiedad 
// de validación que utiliza el paquete validator para 
// garantizar que un valor sea un entero y una función 
// de conversión que analiza el valor como un número.
const intValidator = {
    validation: [val => validator_1.default.isInt(val.toString())],
    converter: (val) => Number.parseInt(val)
};
// El intValidator se utiliza por sí solo como el validador 
// de llaves y en el objeto ValidationRequirements denominado 
// partialResultValidator, que valida las propiedades name, age 
// y years que requiere el método store.
const partialResultValidator = {
    name: [(val) => !validator_1.default.isEmpty(val)],
    age: intValidator,
    years: intValidator
};
// El objeto ResultWebServiceValidation define las propiedades keyValidator,
//  store y replace, lo que indica que el servicio web requiere que se validen 
//  sus valores de ID, así como los datos utilizados por los métodos store y replace
exports.ResultWebServiceValidation = {
    keyValidator: intValidator,
    store: partialResultValidator,
    replace: {
        ...partialResultValidator,
        nextage: intValidator
    }
};
// La propiedad propertyRules utiliza las reglas de validación creadas para los 
// ejemplos anteriores. La propiedad modelRule comprueba que el valor nextage sea la suma de las propiedades age y years.
exports.ResultModelValidation = {
    propertyRules: {
        ...partialResultValidator,
        nextage: intValidator
    },
    modelRule: [(m) => m.nextage === m.age + m.years]
};
