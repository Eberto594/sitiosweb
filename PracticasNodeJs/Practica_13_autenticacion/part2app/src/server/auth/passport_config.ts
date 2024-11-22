import passport from "passport";
import { Strategy } from "passport-jwt";
import { Strategy as LocalStrategy} from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AuthStore } from "./auth_types";

type Config = {
    jwt_secret: string,
    store: AuthStore
}

export const configurePassport = (config: Config) => {
    // La función passport.use se utiliza para configurar las estrategias
    // Estas estrategias requieren una función de verificación, que recibe los datos
    // de la solicitud y devuelve un objeto que representa al usuario.
    passport.use(new LocalStrategy(async(username, password, callback) => {
        if(await config.store.validateCredentials(username, password)){
            return callback(null, {username});
        }
        // La función de verificación solo se llamará cuando el usuario inicie sesión,
        // después de lo cual Passport usa un token temporal para autenticar las solicitudes posteriores.
        return callback(null, false);
    }));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret
    }, (payload, callback) => {
        return callback(null, {username: payload.username});
    }));

    // Passport usa las funciones serializeUser y deserializeUser para incluir 
    // información del usuario en la sesión. Estas funciones deben definirse 
    // incluso cuando, como en este caso, los datos del usuario son solo un 
    // bjeto que contiene un nombre de usuario
    passport.serializeUser((user, callback) => {
        callback(null, user);
    });

    passport.deserializeUser((user, callbak)=> {
        callbak(null, user as Express.User);
    });
}