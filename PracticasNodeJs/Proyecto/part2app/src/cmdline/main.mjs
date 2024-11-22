import { select } from "@inquirer/prompts";
import { ops } from "./operations.mjs";


// Este código utiliza el paquete Inquirer para solicitar al usuario 
// que elija una operación a realizar. Las opciones que se le presentan 
// al usuario se obtienen de las propiedades de un objeto y, al hacer 
// una elección, se ejecuta la función asignada a esa propiedad.
(async function run() {
    let loop = true;
    while(loop){
        const selection = await select({
            message: "Select an operation",
            choices: [...Object.keys(ops).map(k => { return { value: k }})]
        });
        await ops[selection]();
    }
})();