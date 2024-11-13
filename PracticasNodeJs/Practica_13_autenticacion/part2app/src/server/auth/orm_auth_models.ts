// define el modelo de datos para credenciales usando el paquete ORM Sequelize
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Credentials } from "./auth_types";

// La clase CredentialsModel extiende la clase Sequelize Model e 
// implementa la interfaz Credentials, que permite almacenar objetos 
// CredentialsModel en la base de datos y utilizarlos como resultado 
// de un método con la interfaz AuthStore
export class CredentialsModel extends Model<InferAttributes<CredentialsModel>, InferCreationAttributes<CredentialsModel>> implements Credentials{
    declare username: string;
    declare hashedPassword: Buffer;
    declare salt: Buffer;
}

// La función initializeAuthModels recibe un objeto Sequelize 
// e inicializa CredentialsModel para el almacenamiento en la base 
// de datos, identificando la propiedad username como la llave 
// principal e indicando a Sequelize que represente valores, 
// utilizando el tipo de datos SQL STRING para la propiedad 
// username y el tipo BLOB para el código hash y los valores 
// de salt (el tipo BLOB permite almacenar datos como cadenas o búferes)
export const initializeAuthModels = (sequelize: Sequelize) => {

    CredentialsModel.init({
        username: { type: DataTypes.STRING, primaryKey: true},
        hashedPassword: {type: DataTypes.BLOB},
        salt: {type: DataTypes.BLOB}
    }, {sequelize});
}