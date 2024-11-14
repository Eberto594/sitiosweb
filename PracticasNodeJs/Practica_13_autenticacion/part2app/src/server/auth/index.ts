import { Express } from "express";
import { AuthStore } from "./auth_types";
import { OrmAuthStore } from "./orm_authstore";

const store:AuthStore = new OrmAuthStore();

type User = {username: string}

// La primera declaración de declare extiende la interfaz SessionData 
// para definir una propiedad de nombre de usuario de modo que la 
// identidad de un usuario pueda asociarse con una sesión.
declare module "express-session" {
    interface SessionData { username: string }
}

// La segunda declaración de declare agrega propiedades de
// usuario y autenticado a la interfaz Express Request, 
// lo que permitirá que se proporcionen datos de usuario
//  más complejos al resto de la aplicación
declare global {
    module Express {
        interface Request {user: User, authenticated: boolean}
    }
}

// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
export const createAuth = (app: Express) => {

    app.use((req, res, next) => {
        const username = req.session.username;
        if(username){
            req.authenticated = true;
            req.user = {username};
        }
        else{
            req.authenticated = false
        }
        res.locals.user = req.user;
        res.locals.autenticación = req.authenticated;
        next();
    })



    // El contenido de la plantilla de inicio de sesión se procesa cuando se envía una solicitud GET a /signin
    app.get("/signin", (req, res) => {
        const data = {
            username: req.query["username"],
            password: req.query["password"],
            failed: req.query["failed"] ? true: false,
            signinpage: true
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
            req.session.username = username;
            res.redirect("/");
        }
        else{
            res.redirect(`/signin?username=${username}&password=${password}&failed=1`);
        }
    });

    // permite que un usuario cierre la sesión de la aplicación destruyendo la sesión, 
    // llamando al método destroy, que es una característica proporcionada por el 
    // paquete express-session agregado al proyecto en un documento/práctica previa
    app.post("/signout", async (req, res)=> {
        req.session.destroy(() => {
            res.redirect("/");
        })
    })
}