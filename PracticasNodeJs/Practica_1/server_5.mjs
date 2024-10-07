import { createServer } from 'http';

console.log('createServer');
const server = createServer((request, response) => {
    console.log('createServer callback');

    response.writeHead(200, {'content-type': 'text/html; charset=utf_8'});

    const url = new URL(request.url, 'http://localhost:8080');
    console.log(url);

    console.log('Name: ', url.searchParams.get('name'));

    const body =  //esta será la respuesta del servidor una vez que se cargue
    `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"> 
                <title>Node.js Demo</title>
            </head>
            <body>
                <h1 style="color:green">Hello ${url.searchParams.get('name')}</h1>
            </body>
        </html>
    `;

    response.end(body);
});

console.log('listening');

server.listen(8080, ()=>{
    console.log(
        `Server is listening to http://localhost:${server.address().port}`,
    );
});

