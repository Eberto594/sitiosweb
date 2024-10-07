//CARGA DE MODULOS PRINCIPALES
//Cargando el modulo completo
const os = require('os');
console.log(os.uptime());

//Cargando el modulo y extraer cierta funciones con fines de destruccion
const { uptime } = require('os');
console.log(uptime());

