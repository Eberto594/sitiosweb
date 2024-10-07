document.addEventListener('DOMContentLoaded', function() {
    recuperar();
    document.getElementById("agregar").addEventListener("click", agregar);


    // Limpiar los campos de entrada después de agregar
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";

});


recuperar = async() => {


    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    const response = await fetch("/", {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            correo: correo
        })
    })


    contactos = await response.json();

    const body = document.getElementById('body');
    // Limpiar contenido previo si es necesario
    body.innerHTML = '';

    // Recorrer los contactos y generar las filas de la tabla
    contactos.forEach(contacto => {
        const fila = document.createElement('li');



        // Asumiendo que cada contacto tiene nombre, email y teléfono
        fila.innerHTML = `
            
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-11 formulario1">
                            <form action=/editar/${contacto.id} method="POST" >
                                <div class="row">
                                    <div class="col-lg-3">
                                        <input type="text" id="firstName_contact" name="firstName" placeholder="Nombre" class="form-control" value="${contacto.firstName}"/>
                                    </div>

                                    <div class="col-lg-2">
                                        <input type="text" id="lastName_contact" name="lastName" placeholder="Apellido" class="form-control" value="${contacto.lastName}"/>
                                    </div>

                                    <div class="col-lg-2">
                                        <input type="text" id="phone_contact" name="phone" placeholder="Telefono" class="form-control" value="${contacto.phone}"/>
                                    </div>

                                    <div class="col-lg-3">
                                        <input type="text" id="email_contact" name="email" placeholder="Correo" class="form-control" value="${contacto.email}"/>
                                    </div>
                            
                                    <div class="col-lg-1">
                                        <button type="submit" id="modificar_contact" class="btn btn-primary modificar"><img src="edit.png"/></button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="col-lg-1 formulario2">
                            <form action="/borrar/${contacto.id}" method="POST" >
                                <button type="submit" class="btn btn-primary eliminar"><img src="delete.png"/></button>
                            </form>
                        </div>
                    </div>
                </div>
        `;

        // Agregar la fila al cuerpo de la tabla
        body.appendChild(fila);
    });

}

agregar = async() => {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;

    if(nombre !== ""){
        if(apellido !== ""){
            if(telefono !== ""){
                if(correo !== ""){
                    const response = await fetch("/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ 
                            nombre: nombre ,
                            apellido: apellido,
                            telefono: telefono,
                            correo: correo
                        })
                    })
            
                    console.log(await response.json());
                }
                else{
                    alert("Llena correo");
                }
            }
            else{
                alert("Llena telefono");
            }
        }
        else{
            alert("Llena apellido");
        }
    }
    else{
        alert("Llena nombre");
    }

    
    
}