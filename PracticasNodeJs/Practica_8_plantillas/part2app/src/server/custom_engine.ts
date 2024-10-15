import { readFile } from "fs";
import { Express } from "express";
import * as features from "./custom_features";



// Los parámetros son una cadena que contiene la ruta del archivo de plantilla, 
//un objeto que proporciona datos de contexto para renderizar la plantilla y una 
//función de devolución de llamada que se utiliza para proporcionar a Express el contenido
//renderizado o un error si algo sale mal
const renderTemplate = (path: string, contex: any, callback:(err: any, response:string | undefined)=> void) => {
    readFile(path, (err, data) => {
        if(err != undefined){
            callback("Cannot generate content", undefined);
        }
        else{
            callback(undefined, parseTemplate(data.toString(), {...contex, features}));
        }
    });
};

const parseTemplate = (template: string, context: any) => {
    const ctx = Object.keys(context).map((k) => `const ${k} = context.${k}`).join(";");

    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        // return context[group.trim()]??"(no data)"
        // return eval(`${ctx}; ${group}`)
        const evalFunc = (expr: string) => {
            return eval(`${ctx}; ${expr}`)
        }

        try{
            if(group.trim()[0]=== "@"){
                group = `features.${group.trim().substring(1)}`;
                group = group.replace(/\)$/m, ",context,evalFunc)");
            }
            let result = evalFunc(group);
            if(expr.test(result)){
                result = parseTemplate(result, context);
            }
            return result;
        }
        catch(err: any){
            return err;
        }
    });
}

//La función registerCustomTemplateEngine registra el motor de plantilla con Express
export const registerCustomTemplateEngine = (expressApp: Express) => {
    //Express llamará a la función renderTemplate para renderizar una plantilla.
    //le indica a Express que utilice la función renderTemplate para renderizar
    //archivos de plantilla que tengan una extensión de archivo .custom.
    expressApp.engine("custom", renderTemplate);
}