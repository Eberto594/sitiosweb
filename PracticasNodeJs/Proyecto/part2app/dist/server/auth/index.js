"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleHook = exports.roleGuard = exports.createAuth = void 0;
const orm_authstore_1 = require("./orm_authstore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./passport_config");
const jwt_secret = "mytokensecret";
const store = new orm_authstore_1.OrmAuthStore();
// Este archivo exporta una función llamada createAuth, que configura la autenticación para la aplicación.
const createAuth = (app) => {
    (0, passport_config_1.configurePassport)({ store, jwt_secret });
    // El contenido de la plantilla de inicio de sesión se procesa cuando se envía una 
    // solicitud GET a /signin.
    app.get("/signin", (req, res) => {
        const data = {
            //username: req.query["username"],
            //password: req.query["password"],
            failed: req.query["failed"] ? true : false,
            signinpage: true
        };
        res.render("signin", data);
    });
    app.get("/profile", (req, res) => {
        console.log(req.user?.username);
        res.render("profile");
    });
    // Passport proporciona sus propias adiciones al objeto Express Request, por lo que se requieren 
    // ajustes para evitar conflictos. La función authenticate de Passport se utiliza dos veces. Cuando 
    // se utiliza con una ruta, el método authenticate se utiliza para crear un controlador de solicitudes 
    // que validará las credenciales utilizando la estrategia local
    app.post("/signin", passport_1.default.authenticate("local", {
        failureRedirect: `/signin?failed=1`,
        successRedirect: "/"
    }));
    app.use(passport_1.default.authenticate("session"), (req, res, next) => {
        res.locals.user = req.user;
        res.locals.authenticated = req.authenticated = req.user !== undefined;
        next();
    });
    // La ruta /api/signin se basa en el middleware JSON de Express para analizar los datos
    // enviados por el cliente y validar las credenciales del usuario. Si las credenciales 
    // on válidas, se crea un token,
    app.post("/api/signing", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const result = {
            success: await store.validateCredentials(username, password)
        };
        if (result.success) {
            // req.user.passwordCurren = password;
            // La función sign crea un token, que se firma para evitar la manipulación. 
            // Los argumentos son los datos que se usarán como carga útil del token, 
            // un secreto que se usa para firmar el token
            // (que se debe usar nuevamente durante la validación) 
            // y un objeto de configuración que se usa para especificar la expiración del token.
            result.token = jsonwebtoken_1.default.sign({ username }, jwt_secret, { expiresIn: "1hr" });
        }
        res.json(result);
        res.end();
    });
    // permite que un usuario cierre la sesión de la aplicación destruyendo la sesión,
    //  llamando al método destroy, que es una característica proporcionada por el paquete 
    //  express-session agregado al proyecto en un documento/práctica previa
    app.post("/signout", async (req, res) => {
        req.session.destroy(() => {
            res.redirect("/signin");
        });
    });
    app.get('/changePass', async (req, res) => {
        res.render('changePass', {
            failed: false,
            password: '',
            layout: false // Esto evita incluir la plantilla principal
        });
    });
    app.post("/changePass", async (req, res) => {
        const username = req.user?.username;
        const { currentPassword, newPassword } = req.body;
        console.log("username", username);
        console.log("currentPassword", currentPassword);
        console.log("newPassword", newPassword);
        if (currentPassword === "" && newPassword === "") {
            // return res.status(400).json({ success: false, message: "Passwords do not match." });
            res.render('changePass', {
                empty: true,
                password: '',
                layout: false
            });
        }
        // Validar que las contraseñas coincidan
        if (currentPassword === newPassword) {
            // return res.status(400).json({ success: false, message: "Passwords do not match." });
            res.render('changePass', {
                failed: true,
                password: '',
                layout: false
            });
        }
        store.updatePassword(username, newPassword);
        res.redirect('/');
    });
    app.get("/unauthorized", async (req, res) => {
        res.render("unauthorized");
    });
};
exports.createAuth = createAuth;
// La función roleGuard acepta un rol y devuelve un componente de middleware que
// solo pasará la solicitud al controlador si el usuario ha sido asignado a ese
// rol, lo que se verifica mediante el método validationMembership proporcionado
// por la tienda
const roleGuard = (role) => {
    return async (req, res, next) => {
        if (req.authenticated) {
            // Para las solicitudes autenticadas, se redirige al usuario a la URL /unauthorized.
            const username = req.user?.username;
            if (username != undefined && await store.validateMembership(username, role)) {
                next();
                return;
            }
            res.redirect("/unauthorized");
        }
        // Si el usuario no ha sido autenticado, se le redirige a la URL
        // /signin, para que pueda autenticarse e intentarlo nuevamente
        else {
            res.redirect("/signin");
        }
    };
};
exports.roleGuard = roleGuard;
// La función roleHook crea un gancho que autorizará el acceso si se le ha asignado un rol específico a un usuario.
const roleHook = (role) => {
    // Se accede a la identidad del usuario a través del parámetro HookContext, que Feathers proporciona cuando se invoca un gancho
    return async (ctx) => {
        if (!ctx.params.authenticated) {
            // El código de estado 401 indica una solicitud que no incluye datos de autenticación
            ctx.http = { status: 401 };
            ctx.result = {};
        }
        else if (!(await store.validateMembership(ctx.params.user.username, role))) {
            // un código de estado 403 cuando el usuario está autenticado pero no autorizado.
            ctx.http = { status: 403 };
            ctx.result = {};
        }
    };
};
exports.roleHook = roleHook;
