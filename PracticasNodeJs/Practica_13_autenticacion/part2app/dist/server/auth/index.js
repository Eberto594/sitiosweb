"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuth = void 0;
const orm_authstore_1 = require("./orm_authstore");
const store = new orm_authstore_1.OrmAuthStore();
// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
const createAuth = (app) => {
    // El contenido de la plantilla de inicio de sesión se procesa cuando se envía una solicitud GET a /signin
    app.get("/signin", (req, res) => {
        const data = {
            username: req.query["username"],
            password: req.query["password"],
            failed: req.query["failed"] ? true : false,
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
            res.redirect("/");
        }
        else {
            res.redirect(`/signin?username=${username}&password=${password}&failed=1`);
        }
    });
};
exports.createAuth = createAuth;
