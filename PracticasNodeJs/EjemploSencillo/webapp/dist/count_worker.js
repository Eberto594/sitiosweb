"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
console.log(`Worker thread ${worker_threads_1.workerData.request} started`);
//workerData es un objeto o una valor que se utiliza para pasar datos de configuracion
//del subproceso principal al trabajador
for (let iter = 0; iter < worker_threads_1.workerData.iterations; iter++) {
    for (let count = 0; count < worker_threads_1.workerData.total; count++) {
        count++;
    }
    //parentPort se usa para emitir eventos que seran recibidos por el subproceso principal
    //Este metodo emite un evento de mensaje
    //parentPort se usa para emitir eventos que seran recibidos por el subproceso principal
    //el metodo postMessage emite un evento de mensaje y se encarga de transferir el valor del argumento desde
    //el entorno de ejecucion del subproceso de trabajo al subproceso principal
    worker_threads_1.parentPort?.postMessage(iter);
}
console.log(`Worker thread ${worker_threads_1.workerData.request} finished`);
