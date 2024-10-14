import { readFile } from "fs";
import { Express } from "express";


//recibe la ruta del archivo de plantilla
//objeto para dar datos del contexto para renderizar la plantilla
//una callback para dar el contenido a Express o por si se da un error
const renderTemplate = (path: string, context: any, callback:(err: any, response: string | undefined) => void) => {
    //se lee el archivo de plantilla 
    readFile(path, (err, data) => {
        if(err != undefined){
            callback("Cannot generate content", undefined)
        }
        else{
            callback(undefined, parseTemplate(data.toString(), context));
        }
    });
};


const parseTemplate = (template: string, context: any) => {
    const ctx = Object.keys(context).map((k) => `const ${k} = context.${k}`).join(";");

    //expresion regular para buscar los caracteres {{}}
    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        //para cada coincidencia se inserta un valor de datos 
        // return context[group.trim()] ?? "(no data)"
        return eval(`${ctx}; ${group}`);
    });
}

//registramos el motor de plantilla con Express con el metodo Express.engine
//especificamos la extension del archivo y la funcion render Template
//En pocas palabras, esta declaración le indica a Express que utilice la función renderTemplate 
//para renderizar archivos de plantilla que tengan una extensión de archivo .custom
export const registerCustomTemplateEngine = (expressApp: Express) =>
    expressApp.engine("custom", renderTemplate);

