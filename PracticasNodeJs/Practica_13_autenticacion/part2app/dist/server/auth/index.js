"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = exports.createAuth = void 0;
const orm_authstore_1 = require("./orm_authstore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = "mytokensecret";
const store = new orm_authstore_1.OrmAuthStore();
// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
const createAuth = (app) => {
    app.use((req, res, next) => {
        const username = req.session.username;
        if (username) {
            req.authenticated = true;
            req.user = { username };
        }
        else if (req.headers.authorization) {
            let token = req.headers.authorization;
            if (token.startsWith("Bearer")) {
                token = token.substring(7);
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
                req.authenticated = true;
                req.user = { username: decoded.username };
            }
            catch {
                //do nothing - cannot verify token
            }
        }
        else {
            req.authenticated = false;
        }
        res.locals.user = req.user;
        res.locals.autenticación = req.authenticated;
        next();
    });
    // El contenido de la plantilla de inicio de sesión se procesa cuando se envía una solicitud GET a /signin
    app.get("/signin", (req, res) => {
        const data = {
            username: req.query["username"],
            password: req.query["password"],
            failed: req.query["failed"] ? true : false,
            signinpage: true
        };
        res.render("signin", data);
    });
    // Cuando se envía una solicitud POST a /signin, se validan las credenciales que 
    // contiene. Se utiliza una redirección para enviar al usuario de vuelta a la 
    // aplicación si las credenciales son válidas.
    app.post("/signin", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const valid = await store.validateCredentials(username, password);
        if (valid) {
            req.session.username = username;
            res.redirect("/");
        }
        else {
            res.redirect(`/signin?username=${username}&password=${password}&failed=1`);
        }
    });
    // La ruta /api/signin se basa en el middleware JSON de Express para analizar los datos 
    // enviados por el cliente y validar las credenciales del usuario. Si las credenciales 
    // son válidas, se crea un token,
    app.post("/api/signin", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const result = {
            successs: await store.validateCredentials(username, password)
        };
        if (result.successs) {
            // La función sign crea un token, que se firma para evitar la manipulación. 
            // Los argumentos son los datos que se usarán como carga útil del token, 
            // un secreto que se usa para firmar el token
            // un objeto de configuración que se usa para especificar la expiración del token.
            result.token = jsonwebtoken_1.default.sign({ username }, jwt_secret, { expiresIn: "1hr" });
        }
        res.json(result);
        res.end();
    });
    // permite que un usuario cierre la sesión de la aplicación destruyendo la sesión, 
    // llamando al método destroy, que es una característica proporcionada por el 
    // paquete express-session agregado al proyecto en un documento/práctica previa
    app.post("/signout", async (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
    app.get("/unauthorized", async (req, res) => {
        res.render("unauthorized");
    });
};
exports.createAuth = createAuth;
// La función roleGuard acepta un rol y devuelve un componente de middleware 
// que solo pasará la solicitud al controlador si el usuario ha sido asignado 
// a ese rol, lo que se verifica mediante el método validationMembership proporcionado por la tienda.
const roleGuard = (role) => {
    return async (req, res, next) => {
        if (req.authenticated) {
            const username = req.user.username;
            if (await store.validateMembership(username, role)) {
                next();
                return;
            }
            // Para las solicitudes autenticadas, se redirige al usuario a la URL /unauthorized
            res.redirect("/unauthorized");
        }
        // Si el usuario no ha sido autenticado, se le redirige a la URL /signin, para que pueda autenticarse e intentarlo nuevamente
        else {
            res.redirect("/signin");
        }
    };
};
exports.roleGuard = roleGuard;
