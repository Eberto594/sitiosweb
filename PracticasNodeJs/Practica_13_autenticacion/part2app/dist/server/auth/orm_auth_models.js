"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuthModels = exports.CredentialsModel = void 0;
// define el modelo de datos para credenciales usando el paquete ORM Sequelize
const sequelize_1 = require("sequelize");
// La clase CredentialsModel extiende la clase Sequelize Model e 
// implementa la interfaz Credentials, que permite almacenar objetos 
// CredentialsModel en la base de datos y utilizarlos como resultado 
// de un método con la interfaz AuthStore
class CredentialsModel extends sequelize_1.Model {
}
exports.CredentialsModel = CredentialsModel;
// La función initializeAuthModels recibe un objeto Sequelize 
// e inicializa CredentialsModel para el almacenamiento en la base 
// de datos, identificando la propiedad username como la llave 
// principal e indicando a Sequelize que represente valores, 
// utilizando el tipo de datos SQL STRING para la propiedad 
// username y el tipo BLOB para el código hash y los valores 
// de salt (el tipo BLOB permite almacenar datos como cadenas o búferes)
const initializeAuthModels = (sequelize) => {
    CredentialsModel.init({
        username: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        hashedPassword: { type: sequelize_1.DataTypes.BLOB },
        salt: { type: sequelize_1.DataTypes.BLOB }
    }, { sequelize });
};
exports.initializeAuthModels = initializeAuthModels;
