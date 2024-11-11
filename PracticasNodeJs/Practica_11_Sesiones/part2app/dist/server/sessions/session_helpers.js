"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleWare = exports.getSession = void 0;
// import { Session } from "./repository";
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const sequelize_1 = require("sequelize");
const getSession = (req) => req.session;
exports.getSession = getSession;
// La función sessionMiddleware crea un objeto Sequelize que utiliza SQLite 
// y lo utiliza para crear un almacén para los datos de sesión utilizando 
// el paquete connect-session-sequelize
const sessionMiddleWare = () => {
    const sequelize = new sequelize_1.Sequelize({
        dialect: "sqlite",
        storage: "pgk_sessions.db"
    });
    const store = new ((0, connect_session_sequelize_1.default)(express_session_1.default.Store))({
        db: sequelize
    });
    // El método sync se llama para inicializar la base de datos y 
    // la exportación predeterminada del paquete express-session 
    // se utiliza para crear un componente de middleware.
    store.sync();
    // especifica la llave secreta para firmar cookies, el almacén Sequelize y 
    // la configuración de cookies para que el paquete se comporte de la misma 
    // manera que el código personalizado
    return (0, express_session_1.default)({
        secret: "mysecret",
        store: store,
        cookie: {
            maxAge: 300 * 1000,
            sameSite: "strict"
        },
        resave: false,
        saveUninitialized: false
    });
};
exports.sessionMiddleWare = sessionMiddleWare;
