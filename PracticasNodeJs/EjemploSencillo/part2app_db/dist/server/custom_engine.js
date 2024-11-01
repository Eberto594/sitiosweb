"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomTemplateEngine = void 0;
const fs_1 = require("fs");
const features = __importStar(require("./custom_features"));
// Los parámetros son una cadena que contiene la ruta del archivo de plantilla, 
//un objeto que proporciona datos de contexto para renderizar la plantilla y una 
//función de devolución de llamada que se utiliza para proporcionar a Express el contenido
//renderizado o un error si algo sale mal
const renderTemplate = (path, contex, callback) => {
    (0, fs_1.readFile)(path, (err, data) => {
        if (err != undefined) {
            callback("Cannot generate content", undefined);
        }
        else {
            callback(undefined, parseTemplate(data.toString(), { ...contex, features }));
        }
    });
};
const parseTemplate = (template, context) => {
    const ctx = Object.keys(context).map((k) => `const ${k} = context.${k}`).join(";");
    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        // return context[group.trim()]??"(no data)"
        // return eval(`${ctx}; ${group}`)
        const evalFunc = (expr) => {
            return eval(`${ctx}; ${expr}`);
        };
        try {
            if (group.trim()[0] === "@") {
                group = `features.${group.trim().substring(1)}`;
                group = group.replace(/\)$/m, ",context,evalFunc)");
            }
            let result = evalFunc(group);
            if (expr.test(result)) {
                result = parseTemplate(result, context);
            }
            return result;
        }
        catch (err) {
            return err;
        }
    });
};
//La función registerCustomTemplateEngine registra el motor de plantilla con Express
const registerCustomTemplateEngine = (expressApp) => {
    //Express llamará a la función renderTemplate para renderizar una plantilla.
    //le indica a Express que utilice la función renderTemplate para renderizar
    //archivos de plantilla que tengan una extensión de archivo .custom.
    expressApp.engine("custom", renderTemplate);
};
exports.registerCustomTemplateEngine = registerCustomTemplateEngine;
