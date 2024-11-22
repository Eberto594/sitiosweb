import { Op, Sequelize } from "sequelize";
import { Session, SessionRepository } from "./repository";
import { SessionModel, initializeModel } from "./orm_models";
import { randomUUID } from "crypto";

export class OrmRepository implements SessionRepository {
    sequelize: Sequelize;


    constructor(){
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "orm_sessions.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }


    async initModelAndDatabase(): Promise<void>{
        initializeModel(this.sequelize);
        await this.sequelize.drop();
        await this.sequelize.sync();
    }

    async createSesion(): Promise<Session> {
        return {
            id: randomUUID(), 
            data: {}
        }
    }

    // consulta la base de datos para encontrar una fila con una llave principal determinada y 
    // una fecha de vencimiento futura, lo que se hace utilizando el método findOne y una expresión where
    async getSession(id: string): Promise<Session | undefined> {
        // El valor Op.gt representa una comparación mayor y permite que la 
        // búsqueda coincida con filas donde la fecha almacenada en la 
        // columna expires sea mayor que la fecha actual.
        const dbsession = await SessionModel.findOne({
            where: {id, expires: {[Op.gt]: new Date(Date.now())}}
        });

        if(dbsession){
            return { id, data: dbsession.data}
        }
    }

    // El método upsert de Sequelize se utiliza para actualizar una fila de datos si 
    // existe e insertar una si no existe, lo que facilita la implementación del 
    // método saveSession
    async saveSession(session: Session, expires: Date): Promise<void> {
        await SessionModel.upsert({
            id: session.id,
            data: session.data,
            expires
        });
    }

    // El método touchSession se implementa con el método update, que permite actualizar columnas específicas.
    async touchSession(session: Session, expires: Date): Promise<void> {
        await SessionModel.update(
            {expires}, 
            {
                where: { id: session.id }
            });
    }
}