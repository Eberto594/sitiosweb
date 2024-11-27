"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlMateria = exports.Alumno = exports.MateriaModel = exports.ResultModel = exports.Calculation = exports.Person = void 0;
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
class Calculation extends sequelize_1.Model {
}
exports.Calculation = Calculation;
class ResultModel extends sequelize_1.Model {
}
exports.ResultModel = ResultModel;
class MateriaModel extends sequelize_1.Model {
}
exports.MateriaModel = MateriaModel;
class Alumno extends sequelize_1.Model {
}
exports.Alumno = Alumno;
class ControlMateria extends sequelize_1.Model {
}
exports.ControlMateria = ControlMateria;
