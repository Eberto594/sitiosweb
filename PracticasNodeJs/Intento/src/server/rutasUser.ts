import { Op } from "sequelize";
import { Express, NextFunction, Request, RequestHandler, Response } from "express";
import { AuthStore } from "./auth/auth_types";
import { OrmAuthStore } from "./auth/orm_authstore";
import passport from "passport";
import { configurePassport, isAuthenticated } from "./auth/passport_config";
import { getValidationResults, validate } from "./validator/validation";
import { RoleModel } from "./auth/orm_auth_models";

const jwt_secret = "mytokensecret";
const store: AuthStore = new OrmAuthStore();
//type User = { username: string }
//propiedad de nombre
declare module "express-session" {
    interface SessionData { username: string; }
}//propiedades de usuario
declare global {
    module Express {
        // interface Request { user: User, authenticated: boolean }
        interface Request { feathers?: any, authenticated: boolean }
        interface User {
            username: string
        }
    }
}

export const registerFormRoutesUser = (app: Express) => {
    configurePassport({ store, jwt_secret });
    //autentica solicitudes, sesion es la fuente de datos de autenticacion
    //passport busca a req.session
    app.use(passport.authenticate("session"), (req, resp, next) => {
        resp.locals.user = req.user;
        resp.locals.authenticated
            = req.authenticated = req.user !== undefined;
        next();
    });

    app.get("/signin", (req, res) => {
        const data = {
            failed: req.query["failed"] ? true : false,
            signinpage: true//metodo de representación del formulario
        }
        res.render("signin", data); // Renderiza la plantilla `loggin.handlebars`
    });

    // Ruta POST para manejar el formulario enviado
    app.post("/signin", passport.authenticate("local", {
        failureRedirect: "/signin?failed=1",  // Caso fallido
    }), async (req, res) => {
        try {
            const username = req.body.username; // El nombre de usuario del usuario autenticado (esto depende de cómo hayas configurado passport)

            // Verificar si es un usuario normal o administrador
            const isUser = await store.isUser(username);  // Usamos tu función isUser aquí
            console.log("isUser", isUser);
            if (!isUser) {
                // Si es un usuario, redirigir a la interfaz de usuario
                res.redirect("/user");
            } else {
                // Si no es un usuario (es decir, es un administrador), redirigir a la interfaz de administrador
                res.redirect("/admin");
            }
        } catch (error) {
            console.error("Error al verificar roles:", error);
            return res.status(500).send("Error en el servidor");
        }
    });


    app.get("/menuAdmin", (req, res) => {
        // Verifica que el usuario esté autenticado antes de mostrar la página
        // if (req.isAuthenticated()) {
        //res.render("menuAdmin", { user: req.user });
        res.render("menuAdmin");
        // }
    });

    app.get("/user", async (req, res) => {
        // Verifica que el usuario esté autenticado antes de mostrar la página
        // if (req.isAuthenticated()) {
        //
        console.log(await store.getMaterias(2))
        res.render("user");
        // }
    });

    app.get("/saveUser", (req, res) => {
        res.render("saveUser");
    });

    // app.post("/saveUser",
    //     validate("name").required().minLength(2).isText(),
    //     validate("lastname").required().isText().minLength(2),
    //     validate("username").required(),
    //     validate("password").required(),
    //     validate("email").required().isEmail(),
    //     validate("card").required().minLength(16).maxLength(19),
    //     validate("cvv").required().minLength(3).maxLength(4),
    //     validate("expM").required().greaterThan(0).lessThan(13),
    //     validate("expY").required().greaterThan(2024),
    //     validate("cardholder").required().isText(),
    //     async (req, res) => {
    //         const validation = getValidationResults(req);
    //         if (validation.valid) {
    //             try {
    //                 const user = req.body;
    //                 // Almacena el usuario en la base de datos usando `store`
    //                 const model = await store.storeOrUpdateUser(user.name, user.lastname, user.username, user.password, user.email, user.card, user.cvv, user.expM, user.expY, user.cardholder); // Método ficticio, ajusta según tu implementación
    //                 const usersM = await store.getRoleMembers("Users");
    //                 usersM.push(model.nombre);
    //                 console.log(usersM);
    //                 await store.storeOrUpdateRole({
    //                     name: "Users", members: usersM
    //                 });
    //                 res.status(200).json({ success: true });

    //                 // res.json({ success: true, redirect: "/loggin" }); // Redirige al login después del registro
    //             } catch (error) {
    //                 console.error(error);
    //                 res.status(500).json({ success: false, message: "Error al registrar usuario." });
    //             }
    //         } else {
    //             res.status(400).json({ success: false, message: "Validación fallida, revisa bien la información" });
    //         }
    //     });

    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('No se pudo cerrar la sesión');
            }
            res.send('Sesión cerrada exitosamente');
        });
    });
}

//acepta rol y devuelve un componente middleware que pasará soli al controlador
//si el usuario está asignado a ese rol (validateMembership)
export const roleGuard = (role: string)
    : RequestHandler<Request, Response, NextFunction> => {
    return async (req, resp, next) => {
        if (req.authenticated) {//verifica si el usuario está autenticado , authenticated está en passport
            const username = req.user?.username;//obtiene el nombre del ususario
            if (username != undefined
                //valida el username y el rol, vM en ormauthstore 
                && await store.validateMembership(username, role)) {
                next();//si tiene el rol requerido, permite el acceso
                return;
            }//p/ soli autenticadas, pero no autorizadas
            resp.redirect("/unauthorized");
        } else {//en caso de no haber sido autenticado
            resp.redirect("/signin");
        }
    }
}