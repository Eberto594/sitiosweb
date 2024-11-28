"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuthModels = exports.RoleModel = exports.Place = exports.Booking = exports.ControlMateria = exports.MateriaModel = exports.Administrador = exports.Alumno = exports.UsuarioModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
// Sequelize utilizará cada clase para crear una tabla de base de datos 
// y cada propiedad será una columna en esa tabla
// Estas clases también describen los datos en la base de datos al compilador de TypeScript.
class UsuarioModel extends sequelize_1.Model {
}
exports.UsuarioModel = UsuarioModel;
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
class Booking extends sequelize_1.Model {
}
exports.Booking = Booking;
class Place extends sequelize_1.Model {
}
exports.Place = Place;
//se representa un rol
class RoleModel extends sequelize_1.Model {
}
exports.RoleModel = RoleModel;
const initializeAuthModels = (sequelize) => {
    User.init({
        name: { type: sequelize_1.DataTypes.STRING },
        lastname: { type: sequelize_1.DataTypes.STRING },
        username: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        //Blob permite cadenas o bufferes
        hashedPassword: { type: sequelize_1.DataTypes.BLOB },
        salt: { type: sequelize_1.DataTypes.BLOB },
        email: { type: sequelize_1.DataTypes.STRING },
        card: { type: sequelize_1.DataTypes.STRING },
        cvv: { type: sequelize_1.DataTypes.NUMBER, validate: { min: 100, max: 999 } },
        expM: { type: sequelize_1.DataTypes.NUMBER, validate: { min: 1, max: 12 } },
        expY: { type: sequelize_1.DataTypes.NUMBER, validate: { min: 2024 } },
        cardholder: { type: sequelize_1.DataTypes.STRING },
    }, { sequelize });
    RoleModel.init({
        name: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
    }, { sequelize });
    Booking.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        entry: { type: sequelize_1.DataTypes.DATE },
        exit: { type: sequelize_1.DataTypes.DATE },
        cost: { type: sequelize_1.DataTypes.NUMBER },
        userPk: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        placePk: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    }, {
        sequelize,
        timestamps: true
    });
    Place.init({
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        // picture: { type: DataTypes.BLOB },
        suburb: { type: sequelize_1.DataTypes.STRING },
        street: { type: sequelize_1.DataTypes.STRING },
        numberS: { type: sequelize_1.DataTypes.NUMBER },
        status: { type: sequelize_1.DataTypes.BOOLEAN },
        cost: { type: sequelize_1.DataTypes.NUMBER }
    }, { sequelize });
    MateriaModel.init({
        // ...primaryKey,
        nombre: { type: sequelize_1.DataTypes.STRING },
        nivel: { type: sequelize_1.DataTypes.STRING },
        area: { type: sequelize_1.DataTypes.STRING },
        creditos: { type: sequelize_1.DataTypes.INTEGER }
    }, { sequelize });
    UsuarioModel.init({
        nombre: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
        apellidoPa: { type: sequelize_1.DataTypes.STRING },
        apellidoMa: { type: sequelize_1.DataTypes.STRING },
        correo: { type: sequelize_1.DataTypes.STRING },
        matricula: { type: sequelize_1.DataTypes.STRING },
        contraseña: { type: sequelize_1.DataTypes.BLOB },
        salt: { type: sequelize_1.DataTypes.BLOB }
    }, { sequelize });
    RoleModel.belongsToMany(User, //name nombreRol
    //sequelize creará la tabla RoleMembershipJunction, p/crear union
    { through: "RoleMembershipJunction", foreignKey: "name", as: "CredentialsModels" });
    User.belongsToMany(RoleModel, //username es pk
    { through: "RoleMembershipJunction", foreignKey: "username", as: "Roles" });
    // Un User tiene una Booking
    User.hasMany(Booking, {
        foreignKey: 'userPk',
        as: 'bookings', //alias p/relacion
    });
    // Una Booking pertenece a un User
    Booking.belongsTo(User, {
        foreignKey: 'userPk',
        as: 'user',
    });
    // Un Place tiene una Booking
    Place.hasMany(Booking, {
        foreignKey: 'placePk',
        as: 'bookings',
    });
    // Una Booking pertenece a un Place
    Booking.belongsTo(Place, {
        foreignKey: 'placePk',
        as: 'place',
    });
};
exports.initializeAuthModels = initializeAuthModels;
