"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomTemplateEngine = void 0;
const fs_1 = require("fs");
//recibe la ruta del archivo de plantilla
//objeto para dar datos del contexto para renderizar la plantilla
//una callback para dar el contenido a Express o por si se da un error
const renderTemplate = (path, context, callback) => {
    //se lee el archivo de plantilla 
    (0, fs_1.readFile)(path, (err, data) => {
        if (err != undefined) {
            callback("Cannot generate content", undefined);
        }
        else {
            callback(undefined, parseTemplate(data.toString(), context));
        }
    });
};
const parseTemplate = (template, context) => {
    const ctx = Object.keys(context).map((k) => `const ${k} = context.${k}`).join(";");
    //expresion regular para buscar los caracteres {{}}
    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        //para cada coincidencia se inserta un valor de datos 
        // return context[group.trim()] ?? "(no data)"
        return eval(`${ctx}; ${group}`);
    });
};
//registramos el motor de plantilla con Express con el metodo Express.engine
//especificamos la extension del archivo y la funcion render Template
//En pocas palabras, esta declaración le indica a Express que utilice la función renderTemplate 
//para renderizar archivos de plantilla que tengan una extensión de archivo .custom
const registerCustomTemplateEngine = (expressApp) => expressApp.engine("custom", renderTemplate);
exports.registerCustomTemplateEngine = registerCustomTemplateEngine;
