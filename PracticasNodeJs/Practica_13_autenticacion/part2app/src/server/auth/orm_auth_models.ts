// define el modelo de datos para credenciales usando el paquete ORM Sequelize
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, HasManySetAssociationsMixin} from "sequelize";
import { Credentials, Role } from "./auth_types";

// La clase CredentialsModel extiende la clase Sequelize Model e 
// implementa la interfaz Credentials, que permite almacenar objetos 
// CredentialsModel en la base de datos y utilizarlos como resultado 
// de un método con la interfaz AuthStore
export class CredentialsModel extends Model<InferAttributes<CredentialsModel>, InferCreationAttributes<CredentialsModel>> implements Credentials{
    declare username: string;
    declare hashedPassword: Buffer;
    declare salt: Buffer;

    declare RoleModels?:InferAttributes<RoleModel>[];
}

// La clase RoleModel representa un rol, con propiedades que proporcionan el nombre del rol y un arreglo de objetos CredentialsModels.
export class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>>{
    declare name: string;
    declare CredentialsModels?: InferAttributes<CredentialsModel>[];
    declare setCredentialsModels: HasManySetAssociationsMixin<CredentialsModel, string>;
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

    RoleModel.init({
        name:{type: DataTypes.STRING, primaryKey: true},
    },{ sequelize });

    // Los argumentos definen la relación de varios a varios mediante una tabla que lleva el nombre de la clase RoleMembershipJunction para crear la unión.
    RoleModel.belongsToMany(CredentialsModel, {through: "RoleMembershipJunction", foreignKey: "name"});

    CredentialsModel.belongsToMany(RoleModel, {through: "RoleMembershipJunction", foreignKey: "username"});
}