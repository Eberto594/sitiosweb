"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSessionMiddleWare = void 0;
// import { MemoryRepository } from "./memory_repository";
const cookies_1 = require("../cookies");
const orm_repository_1 = require("./orm_repository");
const session_cookie_name = "custon_session";
const expiry_seconds = 300;
const getExpiryDate = () => new Date(Date.now() + (expiry_seconds * 1_000));
// Este componente de middleware lee una cookie que contiene un ID de sesión y 
// lo utiliza para obtener la sesión del repositorio y asociarla con el objeto 
// Request agregando una propiedad denominada session. Si no hay ninguna cookie 
// o no se puede encontrar ninguna sesión con el ID, se inicia una nueva sesión.
const customSessionMiddleWare = () => {
    // const repo: SessionRepository = new MemoryRepository();
    const repo = new orm_repository_1.OrmRepository();
    // Actualizar la expiración de la sesión después de cada solicitud crea una expiración variable, lo que significa que la sesión puede seguir siendo válida indefinidamente. Este es el enfoque más común porque significa que las sesiones son válidas mientras el usuario esté activo y se agotarán después de un período de inactividad.
    return async (req, res, next) => {
        const id = (0, cookies_1.getCookie)(req, session_cookie_name);
        const session = (id ? await repo.getSession(id) : undefined) ?? await repo.createSesion();
        req.session = session;
        (0, cookies_1.setCookie)(res, session_cookie_name, session.id, {
            maxAge: expiry_seconds * 1000
        });
        // El evento finish se activa una vez que se completa una respuesta y 
        // se utiliza el método once para controlar el evento y almacenar la sesión.
        res.once("finish", async () => {
            if (Object.keys(session.data).length > 0) {
                // Las sesiones solo se almacenan para las solicitudes HTTP POST 
                // y cuando se han asignado propiedades al objeto de datos
                if (req.method == "POST") {
                    await repo.saveSession(session, getExpiryDate());
                }
                // Para otros métodos HTTP, se utiliza el método touchSession 
                // para extender el tiempo de expiración de la sesión, pero los 
                // datos de la sesión no se almacenan
                else {
                    await repo.touchSession(session, getExpiryDate());
                }
            }
        });
        next();
    };
};
exports.customSessionMiddleWare = customSessionMiddleWare;
