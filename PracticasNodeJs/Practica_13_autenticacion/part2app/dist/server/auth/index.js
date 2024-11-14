"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuth = void 0;
const orm_authstore_1 = require("./orm_authstore");
const store = new orm_authstore_1.OrmAuthStore();
// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
const createAuth = (app) => {
    app.use((req, res, next) => {
        const username = req.session.username;
        if (username) {
            req.authenticated = true;
            req.user = { username };
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
    // permite que un usuario cierre la sesión de la aplicación destruyendo la sesión, 
    // llamando al método destroy, que es una característica proporcionada por el 
    // paquete express-session agregado al proyecto en un documento/práctica previa
    app.post("/signout", async (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
};
exports.createAuth = createAuth;
