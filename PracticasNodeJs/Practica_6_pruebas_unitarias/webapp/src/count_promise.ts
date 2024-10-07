import { Worker } from "worker_threads";


//funcion que devuelve una Promisa<void> cuyo ejecutor inicia un hilo de trabajo 
//y configura constroladores para los eventos que emite.
export const Count = (request: number, iterations: number, total:number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const worker = new Worker(__dirname + "/count_worker.js", {
            workerData: {
                iterations,
                total,
                request
            }
        });

        worker.on("exit", (code) => {
            if(code !== 0)
                reject();
            else
                resolve();
        });

        worker.on("error", reject);
    });
}
