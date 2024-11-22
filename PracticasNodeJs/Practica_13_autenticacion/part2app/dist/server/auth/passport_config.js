"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const configurePassport = (config) => {
    // La función passport.use se utiliza para configurar las estrategias
    // Estas estrategias requieren una función de verificación, que recibe los datos
    // de la solicitud y devuelve un objeto que representa al usuario.
    passport_1.default.use(new passport_local_1.Strategy(async (username, password, callback) => {
        if (await config.store.validateCredentials(username, password)) {
            return callback(null, { username });
        }
        // La función de verificación solo se llamará cuando el usuario inicie sesión,
        // después de lo cual Passport usa un token temporal para autenticar las solicitudes posteriores.
        return callback(null, false);
    }));
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret
    }, (payload, callback) => {
        return callback(null, { username: payload.username });
    }));
    // Passport usa las funciones serializeUser y deserializeUser para incluir 
    // información del usuario en la sesión. Estas funciones deben definirse 
    // incluso cuando, como en este caso, los datos del usuario son solo un 
    // bjeto que contiene un nombre de usuario
    passport_1.default.serializeUser((user, callback) => {
        callback(null, user);
    });
    passport_1.default.deserializeUser((user, callbak) => {
        callbak(null, user);
    });
};
exports.configurePassport = configurePassport;
