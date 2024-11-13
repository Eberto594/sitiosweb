import { Express } from "express";
import { AuthStore } from "./auth_types";
import { OrmAuthStore } from "./orm_authstore";

const store:AuthStore = new OrmAuthStore();

// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
export const createAuth = (app: Express) => {
    // El contenido de la plantilla de inicio de sesión se procesa cuando se envía una solicitud GET a /signin
    app.get("/signin", (req, res) => {
        const data = {
            username: req.query["username"],
            password: req.query["password"],
            failed: req.query["failed"] ? true: false,
        }
        res.render("signin", data)
    })

    // Cuando se envía una solicitud POST a /signin, se validan las credenciales que 
    // contiene. Se utiliza una redirección para enviar al usuario de vuelta a la 
    // aplicación si las credenciales son válidas.
    app.post("/signin", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const valid = await store.validateCredentials(username, password);
        
        if(valid){
            res.redirect("/");
        }
        else{
            res.redirect(`/signin?username=${username}&password=${password}&failed=1`);
        }
    });
}