"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmRepository = void 0;
const sequelize_1 = require("sequelize");
const orm_helpers_1 = require("./orm_helpers");
const orm_models_1 = require("./orm_models");
class OrmRepository {
    sequelize;
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            // dialecto especifica SQLite
            dialect: "sqlite",
            // opción de almacenamiento especifica el nombre del archivo
            storage: "orm_age.db",
            // puede resultar útil ver las consultas SQL que se generan, 
            // por lo que se configuran las opciones logging y logQueryParameters
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }
    // El método initModelAndDatabase llama a las funciones initializeModels
    // y defineRelationships para configurar los objetos del modelo de datos
    async initModelAndDatabase() {
        (0, orm_helpers_1.initializeModels)(this.sequelize);
        (0, orm_helpers_1.defineRelationships)();
        // El método drop le indica a Sequelize que elimine las tablas de la base de datos
        await this.sequelize.drop();
        // El método sync le indica a Sequelize que sincronice la base de datos con los
        // objetos del modelo de datos, lo que tiene el efecto de crear tablas para lo
        //  datos ResultModel, Person y Calculation
        await this.sequelize.sync();
        // se llama a la función addSeedData para agregar los datos iniciales a la base de datos
        await (0, orm_helpers_1.addSeedData)(this.sequelize);
    }
    async saveResult(r) {
        // La transacción se crea con el método Sequelize.transaction, 
        // que acepta una función de devolución de llamada que recibe un objeto Transaction
        return await this.sequelize.transaction(async (tx) => {
            // se utiliza el método findOrCreate para ver si hay objetos 
            // Person y Calculation en la base de datos que coincidan con los 
            // datos recibidos por el método saveResult.
            const [person] = await orm_models_1.Person.findOrCreate({
                where: { name: r.name },
                transaction: tx
            });
            const [calculation] = await orm_models_1.Calculation.findOrCreate({
                where: {
                    age: r.age, years: r.years, nextage: r.nextage
                },
                transaction: tx
            });
            return (await orm_models_1.ResultModel.create({
                personId: person.id, calculationId: calculation.id
            }, { transaction: tx })).id;
        });
    }
    // El método findAll se llama en la clase ResultModel y se configura 
    // con un objeto que tiene propiedades include, limit y order. 
    // La propiedad más importante es include, que le indica a Sequelize 
    // que siga las relaciones de clave externa para cargar datos relacionados 
    // y crear objetos a partir de los resultados
    async getAllResults(limit) {
        return (await orm_models_1.ResultModel.findAll({
            include: [orm_models_1.Person, orm_models_1.Calculation],
            limit,
            order: [["id", "DESC"]]
        })).map(row => (0, orm_helpers_1.fromOrmModel)(row));
    }
    // propiedad where, que le indica a Sequelize que siga la 
    // relación de clave externa y que haga coincidir los objetos
    // Person mediante la propiedad name
    async getResultsByName(name, limit) {
        return (await orm_models_1.ResultModel.findAll({
            include: [orm_models_1.Person, orm_models_1.Calculation],
            where: {
                "$Person.name$": name
            },
            limit, order: [["id", "DESC"]]
        })).map(row => (0, orm_helpers_1.fromOrmModel)(row));
    }
}
exports.OrmRepository = OrmRepository;
