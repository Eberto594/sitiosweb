"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmRepository = void 0;
const sequelize_1 = require("sequelize");
const orm_models_1 = require("./orm_models");
const crypto_1 = require("crypto");
class OrmRepository {
    sequelize;
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: "sqlite",
            storage: "orm_sessions.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }
    async initModelAndDatabase() {
        (0, orm_models_1.initializeModel)(this.sequelize);
        await this.sequelize.drop();
        await this.sequelize.sync();
    }
    async createSesion() {
        return {
            id: (0, crypto_1.randomUUID)(),
            data: {}
        };
    }
    // consulta la base de datos para encontrar una fila con una llave principal determinada y 
    // una fecha de vencimiento futura, lo que se hace utilizando el método findOne y una expresión where
    async getSession(id) {
        // El valor Op.gt representa una comparación mayor y permite que la 
        // búsqueda coincida con filas donde la fecha almacenada en la 
        // columna expires sea mayor que la fecha actual.
        const dbsession = await orm_models_1.SessionModel.findOne({
            where: { id, expires: { [sequelize_1.Op.gt]: new Date(Date.now()) } }
        });
        if (dbsession) {
            return { id, data: dbsession.data };
        }
    }
    // El método upsert de Sequelize se utiliza para actualizar una fila de datos si 
    // existe e insertar una si no existe, lo que facilita la implementación del 
    // método saveSession
    async saveSession(session, expires) {
        await orm_models_1.SessionModel.upsert({
            id: session.id,
            data: session.data,
            expires
        });
    }
    // El método touchSession se implementa con el método update, que permite actualizar columnas específicas.
    async touchSession(session, expires) {
        await orm_models_1.SessionModel.update({ expires }, {
            where: { id: session.id }
        });
    }
}
exports.OrmRepository = OrmRepository;
