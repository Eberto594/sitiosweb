//Version 2 del servidor. Ya es capaz de responder solicitudes
import { createServer } from 'http'; //se importa el modelo 

const server = createServer((request, response) =>{ //se crea el servidor pasando como parametro la solicitud y la respuesta
    response.writeHead(200, 
        { 'content-type': 'text/plain; charset=utf-8'}
    ); // este metodo indica la respuesta del servidor, debemos indicar el formato que se va a presentar, en este caso texto plano
    
    response.write('Hello '); //se mando la respuesta del servidor con el metodo write
    response.end(' World\n'); //cuando se termina de cargar el servidor se imprime el ultimo mensaje
});


server.listen(8080, () =>{
    console.log(`Server is listening to http://localhost: ${server.address().port}`,
    );
}); //se crear el servidor de la misma manera que en la version uno