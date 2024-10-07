import { createServer } from 'http'; //importamos el modulo

const server = createServer((request, response) => {
    response.writeHead(200, {'content-type': 'text/html; charset=utf-8'}); //escribimos el encabezado

    const body =  //esta será la respuesta del servidor una vez que se cargue
    `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"> 
                <title>Node.js Demo</title>
            </head>
            <body>
                <h1 style="color:green">Hello World</h1>
            </body>
        </html>
    `;

    response.end(body); // se carga la respuesta
});

server.listen(8080, () => {
    console.log(
        `Server is listening to http://localhost:${server.address().port}`,
    );
}); //se crea el servidor
