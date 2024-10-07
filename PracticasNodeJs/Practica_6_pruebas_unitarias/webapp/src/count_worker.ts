import { workerData, parentPort } from "worker_threads";

console.log(`Worker thread ${workerData.request} started`);

//workerData es un objeto o una valor que se utiliza para pasar datos de configuracion
//del subproceso principal al trabajador

for(let iter = 0; iter < workerData.iterations; iter++){
    for(let count = 0; count < workerData.total; count++){
        count++;
    }
    //parentPort se usa para emitir eventos que seran recibidos por el subproceso principal
    //Este metodo emite un evento de mensaje
    //parentPort se usa para emitir eventos que seran recibidos por el subproceso principal
    //el metodo postMessage emite un evento de mensaje y se encarga de transferir el valor del argumento desde
    //el entorno de ejecucion del subproceso de trabajo al subproceso principal
    parentPort?.postMessage(iter);
}

console.log(`Worker thread ${workerData.request} finished`);