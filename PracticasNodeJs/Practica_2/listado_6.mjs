//Simulación de __filename y __dirname para el sistema de módulos ECMAScript.
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); //Puedes utilizar la propiedad import.meta.url 
                                                //para mostrar el nombre de archivo absoluto del script actual
const __dirname = dirname(__filename);

console.log(__filename);
console.log(__dirname);