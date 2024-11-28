"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModel = exports.Calculation = exports.Person = exports.ControlMateria = exports.MateriaModel = exports.Administrador = exports.Alumno = exports.initilizeAuthModels = exports.RoleModel = exports.UsuarioModel = void 0;
const sequelize_1 = require("sequelize");
//El primer paso es definir las clases que representarán los datos en la base de datos
// Sequelize utilizará cada clase para crear una tabla de base de datos 
// y cada propiedad será una columna en esa tabla
// Estas clases también describen los datos en la base de datos al compilador de TypeScript.
class UsuarioModel extends sequelize_1.Model {
}
exports.UsuarioModel = UsuarioModel;
// / La clase RoleModel representa un rol, con propiedades que proporcionan
// el nombre del rol y un arreglo de objetos CredentialsModels.
class RoleModel extends sequelize_1.Model {
}
exports.RoleModel = RoleModel;
// recibe un objeto Sequelize e inicializa CredentialsModel para el 
// almacenamiento en la base de datos, identificando la propiedad username 
// como la llave principal e indicando a Sequelize que represente valores, 
// utilizando el tipo de datos SQL STRING para la propiedad username y el tipo 
// BLOB para el código hash y los valores de salt (el tipo BLOB permite almacenar 
// datos como cadenas o búferes).
const initilizeAuthModels = (sequelize) => {
    // UsuarioModel.init({
    //     username: {type: DataTypes.STRING, primaryKey: true},
    //     hashedPassword: {type: DataTypes.BLOB},
    //     salt: {type: DataTypes.BLOB}
    // }, {sequelize});
    RoleModel.init({
        name: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    }, { sequelize });
    // Para almacenar las pertenencias a roles se necesita una relación de varios a varios,
    //  en la que cada rol se puede asociar con muchas credenciales de usuario y cada 
    //  credencial de usuario se puede asociar con muchos roles.
    RoleModel.belongsToMany(UsuarioModel, { through: "RoleMembershipJunction", foreignKey: "name" });
    // Los argumentos definen la relación de varios a varios mediante una tabla que lleva el 
    // nombre de la clase RoleMembershipJunction para crear la unión.
    UsuarioModel.belongsToMany(RoleModel, { through: "RoleMembershipJunction", foreignKey: "username" });
};
exports.initilizeAuthModels = initilizeAuthModels;
class Alumno extends UsuarioModel {
}
exports.Alumno = Alumno;
class Administrador extends UsuarioModel {
}
exports.Administrador = Administrador;
class MateriaModel extends sequelize_1.Model {
}
exports.MateriaModel = MateriaModel;
class ControlMateria extends sequelize_1.Model {
}
exports.ControlMateria = ControlMateria;
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
