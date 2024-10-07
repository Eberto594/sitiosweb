//Version 1 del codigo de servidor. No tiene la capacidad de responder solicitudes
import {createServer} from 'http'; //importamos el constructor del servidor del modulo http

const server = createServer(); //creamos el servidor
server.listen(8080, ()=>{ //encendemos el servidor con el metodo y le pasamos el puerto
    //y una arrow function para indicar que hara
    console.log(//simplemente se imprime la url del localhost junto con el puerto
        `Server is listening to http://localhost:${server.address().port}`,
    );
}); 

// Si recibes el error create Server: listen EADDRINUSE:::8080
// al ejecutar tu aplicación, significa que el puerto ya está ocupado 
// por otra aplicación y debes elegir otro puerto para tu aplicación Node.js.


