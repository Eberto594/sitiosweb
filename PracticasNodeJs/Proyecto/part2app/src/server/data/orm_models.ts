import { DataTypes, Model, CreationOptional, ForeignKey, InferCreationAttributes, InferAttributes, HasManySetAssociationsMixin, Sequelize } from "sequelize";
//El primer paso es definir las clases que representarán los datos en la base de datos


// Sequelize utilizará cada clase para crear una tabla de base de datos 
// y cada propiedad será una columna en esa tabla
// Estas clases también describen los datos en la base de datos al compilador de TypeScript.

export class UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
    declare id?: CreationOptional<number>;
    declare nombre: string; //username
    declare apellidoPa: string;
    declare apellidoMa: string;
    declare correo: string;
    declare matricula: string;
    declare contraseña: Buffer; //hashedPassword
    declare salt: Buffer;
    declare RoleModels?: InferAttributes<RoleModel>[];
}



// / La clase RoleModel representa un rol, con propiedades que proporcionan
// el nombre del rol y un arreglo de objetos CredentialsModels.
export class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    declare name: string;
    declare UsuaioModels?: InferAttributes<UsuarioModel>[];
    declare UsaurioModels: HasManySetAssociationsMixin<UsuarioModel, string>;
}

// recibe un objeto Sequelize e inicializa CredentialsModel para el 
// almacenamiento en la base de datos, identificando la propiedad username 
// como la llave principal e indicando a Sequelize que represente valores, 
// utilizando el tipo de datos SQL STRING para la propiedad username y el tipo 
// BLOB para el código hash y los valores de salt (el tipo BLOB permite almacenar 
// datos como cadenas o búferes).
export const initilizeAuthModels = (sequelize: Sequelize) => {
    // UsuarioModel.init({
    //     username: {type: DataTypes.STRING, primaryKey: true},
    //     hashedPassword: {type: DataTypes.BLOB},
    //     salt: {type: DataTypes.BLOB}
    // }, {sequelize});

    RoleModel.init({
        name: {type: DataTypes.STRING, primaryKey: true},
    }, {sequelize});

    // Para almacenar las pertenencias a roles se necesita una relación de varios a varios,
    //  en la que cada rol se puede asociar con muchas credenciales de usuario y cada 
    //  credencial de usuario se puede asociar con muchos roles.
    RoleModel.belongsToMany(UsuarioModel, {through: "RoleMembershipJunction", foreignKey: "name"});
    // Los argumentos definen la relación de varios a varios mediante una tabla que lleva el 
    // nombre de la clase RoleMembershipJunction para crear la unión.
    UsuarioModel.belongsToMany(RoleModel, { through: "RoleMembershipJunction", foreignKey: "username"});
}

export class Alumno extends UsuarioModel {
    declare id?: CreationOptional<number>;
    declare periodoAct: number;
}

export class Administrador extends UsuarioModel{
    declare id?: CreationOptional<number>;
}


export class MateriaModel extends Model<InferAttributes<MateriaModel>, InferCreationAttributes<MateriaModel>> {
    declare id?: CreationOptional<number>;
    declare nombre: string;    
    declare nivel: string;
    declare area: string;
    declare creditos: number;
}



export class ControlMateria extends Model<InferAttributes<ControlMateria>, InferCreationAttributes<ControlMateria>> {
    declare id?: CreationOptional<number>;
    declare idAlumno: ForeignKey<Alumno["id"]>;
    declare idMateria: ForeignKey<MateriaModel["id"]>;
    declare estado: string;
    declare Alumno?: InferAttributes<Alumno>;
    declare MateriaModel?: InferAttributes<MateriaModel>;
    declare periodo: number;
    declare semestre: string;
}















































// El tipo InferAttributes<Person> selecciona todas las propiedades definidas por la clase Person
// el tipo InferCreationAttributes<Person> excluye las propiedades cuyo tipo es CreationOptional<T>.
export class Person extends Model<InferAttributes<Person>, InferCreationAttributes<Person>> {
    declare id?: CreationOptional<number>;
    declare name: string
}

export class Calculation extends Model<InferAttributes<Calculation>, InferCreationAttributes<Calculation>> {
    // El tipo CreationOptional<T> se utiliza para describir 
    // una propiedad que no tiene que proporcionarse cuando se crea una nueva instancia de la clase del modelo
    declare id?: CreationOptional<number>;
    declare age: number;
    declare years: number;
    declare nextage: number;
}

export class ResultModel extends Model<InferAttributes<ResultModel>, InferCreationAttributes<ResultModel>> {
    declare id: CreationOptional<number>;
    declare personId: ForeignKey<Person["id"]>;
    declare calculationId: ForeignKey<Calculation["id"]>;
    declare Person?: InferAttributes<Person>;
    declare Calculation?: InferAttributes<Calculation>;
}