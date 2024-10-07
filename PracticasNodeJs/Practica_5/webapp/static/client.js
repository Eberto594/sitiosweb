document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", sendReq);
});

const requestUrl = "/read";

sendReq = async() => {
    // let payload = []; //arreglo para guardar los datos
    // for(let i = 0; i < 5; i++){
    //     payload.push({//agregar los datos al arreglo
    //         id: i, 
    //         message:`Payload Message: ${i}\n`
    //     });
    // }

    // const response = await fetch(requestUrl, {//utiliza el metodo fecth del navegador para enviar una solicitud HTTP POST con un cuerpo de 10000 lineas 
    //     method: "POST", //metodo HTTP que se utiliza
    //     body: JSON.stringify(payload), //formateo del arreglo a una estructura JSON
    //     headers:{
    //         "Content-Type": "application/json"//encabezado el archivo
    //     }
    // })

    const response = await fetch(requestUrl, {
        method: "POST",
        body: document.getElementById("input").value,
    })

    document.getElementById("msg").textContent = response.statusText; //codigo del server se imprime
    // document.getElementById("body").textContent = `Resp: ${await response.text()}`; // se obtiene la respuesta
    document.getElementById("body").innerHTML = await response.text();

}