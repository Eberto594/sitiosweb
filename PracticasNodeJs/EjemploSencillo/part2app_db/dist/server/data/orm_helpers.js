"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromOrmModel = exports.addSeedData = exports.initializeModels = void 0;
// El siguiente paso es indicarle a Sequelize cómo debe representarse 
// cada propiedad definida por las clases del modelo en la base de datos
const sequelize_1 = require("sequelize");
const orm_models_1 = require("./orm_models");
const primaryKey = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
};
const initializeModels = (sequelize) => {
    // el método init, que acepta un objeto cuyas propiedades corresponden
    // a las definidas por la clase. A cada propiedad se le asigna un objeto 
    // de configuración que le indica a Sequelize cómo representar los datos en la base de datos.
    orm_models_1.Person.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING },
        lastname: { type: sequelize_1.DataTypes.STRING }
    }, { sequelize });
    // Calculation.init({
    //     ...primaryKey, 
    //     // se selecciona un valor de la clase DataTypes 
    //     // para especificar el tipo de datos SQL que se 
    //     // utilizará cuando se cree la base de datos
    //     age: { type: DataTypes.INTEGER},
    //     years: { type: DataTypes.INTEGER},
    //     nextage: { type: DataTypes.INTEGER},
    // }, { sequelize });
    // ResultModel.init({
    //     ...primaryKey,
    //     // El segundo argumento aceptado por el método init se utiliza para configurar el modelo de datos general
    // },{sequelize})
};
exports.initializeModels = initializeModels;
// La clase base Model proporciona métodos para describir las relaciones entre las clases del modelo,
// export const defineRelationships = () => {
//     // la propiedad foreignKey se utiliza para especificar la llave foránea en la clase 
//     // ResultModel para las relaciones uno a uno con los tipos Person y Calculation.
//     // ResultModel.belongsTo(Person, { foreignKey: "personId" });
//     // ResultModel.belongsTo(Calculation, { foreignKey: "calculationId"});
// }
const addSeedData = async (sequelize) => {
    // El método Sequelize.query acepta una cadena que contiene una declaración SQL
    // await sequelize.query(`
    //     INSERT INTO Calculations
    //     (id, age, years, nextage, createdAt, updatedAt) VALUES
    //     (1, 35, 5, 40, date(), date()),
    //     (2, 35, 10, 45, date(), date())`);
    // Sequelize agrega estas columnas para realizar un seguimiento de 
    // cuándo se crean y modifican las filas de la tabla.
    await sequelize.query(`
        INSERT INTO People (id, name, lastname, createdAt, updatedAt) VALUES
        (1, "Alice", "Robles", date(), date()), (2, "Bob", "Gutierrez", date(), date())`);
};
exports.addSeedData = addSeedData;
// función que transforma los objetos ResultModel proporcionados por 
// el paquete ORM en objetos Result requeridos por la interfaz Repository.
const fromOrmModel = (person) => {
    return {
        id: person?.id || 0,
        name: person?.name || "",
        lastname: person?.lastname || ""
        // age: model?.Calculation?.age || 0,
        // years: model?.Calculation?.years || 0,
        // nextage: model?.Calculation?.age || 0
    };
};
exports.fromOrmModel = fromOrmModel;
