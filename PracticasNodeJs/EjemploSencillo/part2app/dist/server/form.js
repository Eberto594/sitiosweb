"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("./validation");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fs_2 = __importDefault(require("fs"));
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", (req, res) => {
        // res.render("age", {helpers: {pass}});
        const filePath = path_1.default.join("./static/", 'contacts.json');
        //leer el archivo JSON
        fs_2.default.readFile(filePath, 'utf-8', (err, data) => {
            let contactos = [];
            if (err && err.code !== 'ENOENT') {
                console.log("Error al leer el archivo JSON: ", err);
            }
            if (!err && data) {
                try {
                    contactos = JSON.parse(data);
                }
                catch (parseErr) {
                    console.log("Error al parsear el archivo JSON: ", parseErr);
                }
            }
            res.render("age", {
                contactos,
                helpers: { pass }
            });
        });
    });
    app.post("/editar/:id", (req, res) => {
        const { id } = req.params;
        const { name, age, phone } = req.body;
        let contactos = JSON.parse((0, fs_1.readFileSync)("./static/contacts.json").toString());
        // Actualizar el contacto en el array solo después de haber leído y parseado el archivo
        contactos = contactos.map((contacto) => contacto.id == id ? { ...contacto, name, age, phone } : contacto);
        // Guardar el arreglo actualizado en el archivo JSON
        (0, fs_1.writeFileSync)("./static/contacts.json", JSON.stringify(contactos, null, 2));
        res.redirect("/form");
    });
    app.post("/borrar/:id", (req, res) => {
        const { id } = req.params;
        let contactos = JSON.parse((0, fs_1.readFileSync)("./static/contacts.json").toString());
        contactos = contactos.filter((contact) => contact.id != id);
        // Guardar el arreglo actualizado en el archivo JSON
        (0, fs_1.writeFileSync)("./static/contacts.json", JSON.stringify(contactos, null, 2));
        res.redirect("/form");
    });
    app.post("/form", (req, resp) => {
        const validation = (0, validation_1.getValidationResults)(req);
        console.log(req.body);
        const context = {
            ...req.body, validation,
            helpers: { pass }
        };
        let contactos = JSON.parse((0, fs_1.readFileSync)("./static/contacts.json").toString());
        if (validation.valid) {
            context.nextage = Number.parseInt(req.body.edad) + 1;
            const filePath = path_1.default.join("./static/", 'contacts.json');
            //leer el archivo actual y agregar el nuevo contacto
            fs_2.default.readFile(filePath, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.log("Error al leer el archivo JSON: ", err);
                    resp.render("age", context);
                }
                if (!err) {
                    try {
                        contactos = JSON.parse(data);
                    }
                    catch (parseErr) {
                        console.log("Error al parsear el archivo JSON", parseErr);
                        resp.render("age", context);
                    }
                }
                //Agregar el nuevo contacto
                const nuevoContacto = {
                    id: Date.now(),
                    name: context.name,
                    age: context.age,
                    phone: context.phone
                };
                contactos.push(nuevoContacto);
                // Guardar los datos actualizados en el archivo JSON
                fs_2.default.writeFile(filePath, JSON.stringify(contactos, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error al escribir en el archivo JSON:', writeErr);
                        resp.render("age", context);
                    }
                    else {
                        console.log('Nuevo contacto agregado al archivo JSON');
                    }
                    // Renderizar la plantilla después de guardar los datos
                    // resp.render("age", {contactos, context});
                    resp.render("age", {
                        contactos,
                        helpers: { pass }
                    });
                });
            });
        }
        // resp.render("age", {contactos, helpers:{pass}});
    });
};
exports.registerFormRoutes = registerFormRoutes;
const pass = (valid, propname, test) => {
    let propResult = valid?.results?.[propname];
    return `display: ${!propResult || propResult[test] ? "none" : "block"}`;
};
