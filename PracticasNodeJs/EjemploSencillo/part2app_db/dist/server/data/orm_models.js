"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const sequelize_1 = require("sequelize");
//El primer paso es definir las clases que representarán los datos en la base de datos
// Sequelize utilizará cada clase para crear una tabla de base de datos 
// y cada propiedad será una columna en esa tabla
// Estas clases también describen los datos en la base de datos al compilador de TypeScript.
// El tipo InferAttributes<Person> selecciona todas las propiedades definidas por la clase Person
// el tipo InferCreationAttributes<Person> excluye las propiedades cuyo tipo es CreationOptional<T>.
class Person extends sequelize_1.Model {
}
exports.Person = Person;
// export class Calculation extends Model<InferAttributes<Calculation>, InferCreationAttributes<Calculation>> {
//     // El tipo CreationOptional<T> se utiliza para describir 
//     // una propiedad que no tiene que proporcionarse cuando se crea una nueva instancia de la clase del modelo
//     declare id?: CreationOptional<number>;
//     declare age: number;
//     declare years: number;
//     declare nextage: number;
// }
// export class ResultModel extends Model<InferAttributes<ResultModel>, InferCreationAttributes<ResultModel>> {
//     declare id: CreationOptional<number>;
//     declare personId: ForeignKey<Person["id"]>;
//     declare calculationId: ForeignKey<Calculation["id"]>;
//     declare Person?: InferAttributes<Person>;
//     declare Calculation?: InferAttributes<Calculation>;
// }