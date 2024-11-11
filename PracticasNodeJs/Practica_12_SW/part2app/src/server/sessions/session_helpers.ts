import { Request } from "express";
// import { Session } from "./repository";
import session, { SessionData } from "express-session";
import sessionStore from "connect-session-sequelize";
import { Sequelize } from "sequelize";
import { Result } from "../data/repository";

export const getSession = (req: Request): SessionData => (req as any).session;

// La palabra clave declare se usa para indicarle a TypeScript que la 
// interfaz Request tiene una propiedad adicional
// declare global {
//     module Express {
//         interface Request {
//             session: Session
//         }
//     }
// }

declare module "express-session" {
    interface SessionData {
        personalHistory: Result[];
    }
}

// La función sessionMiddleware crea un objeto Sequelize que utiliza SQLite 
// y lo utiliza para crear un almacén para los datos de sesión utilizando 
// el paquete connect-session-sequelize
export const sessionMiddleWare = () => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "pgk_sessions.db"
    });

    const store = new (sessionStore(session.Store))({
        db: sequelize
    });

    // El método sync se llama para inicializar la base de datos y 
    // la exportación predeterminada del paquete express-session 
    // se utiliza para crear un componente de middleware.
    store.sync();

    // especifica la llave secreta para firmar cookies, el almacén Sequelize y 
    // la configuración de cookies para que el paquete se comporte de la misma 
    // manera que el código personalizado
    return session({
        secret: "mysecret",
        store: store,
        cookie: { 
            maxAge: 300 * 1000, 
            sameSite: "strict"
        },
        resave: false, 
        saveUninitialized: false
    })
}



