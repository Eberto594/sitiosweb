import { input, password } from "@inquirer/prompts";
// Este archivo proporciona las operaciones que el usuario puede seleccionar, 
// con una operación de prueba para comenzar y asegurarse de que todo funciona 
// como debería, y una opción de salida que utiliza el método de Node.js process.exit 
// para finalizar el proceso

const baseUrl = "http://localhost:5000";

let bearer_token;

export const ops = {
    // "Test": () => {
    //     console.log("Test operation selected");
    // },
    // "Exit": () => process.exit()
    "Sign In": async () => {
        const creds = {
            username: await input({message: "Username?"}),
            password: await input({message: "Password?"}),
        };

        const response = await sendRequest("POST", "/api/signin", creds);

        if(response.success == true){
            bearer_token = response.token;
        };

    },
    "Sign Out": () => {
        bearer_token = undefined
    },
    "Get All": () => sendRequest("GET", "/api/results"),
    "Get Name": async () => {
        const name = await input({message: "Name?"});
        await sendRequest("GET", `/api/results?name=${name}`);
    },
    "Get ID": async () => {
        const id = await input({message: "ID?"});
        await sendRequest("GET", `/api/results/${id}`);
    },
    "Store": async() =>{
        const values = {
            name: await input({message: "Name?"}),
            age: await input({message: "Age?"}),
            years: await input({message: "Years?"})
        }
        await sendRequest("POST", "/api/results", values);
    },
    "Delete": async () => {
        const id = await input({message: "ID?"});
        await sendRequest("DELETE", `/api/results/${id}`);
    },
    "Replace": async() => {
        const id = await input({message: "ID?"});
        const values = {
            name: await input({message: "Name?"}),
            age: await input({message: "Age?"}),
            years: await input({message: "Years?"}),
            nextage: await input({message: "Next Age?"})
        };
        await sendRequest("PUT", `/api/results/${id}`, values);
    },
    "Modify": async () => {
        const id = await input({message: "ID?"});
        const value = {
            name: await input({message: "Name?"}),
            age: await input({message: "Age?"}),
            years: await input({message: "Years?"}),
            nextage: await input({message: "NextAge?"})
        };
        // las funciones Object.fromEntries, Object.entries y filter de JavaScript 
        // se utilizan para excluir cualquier propiedad para la que no se proporciona 
        // ningún valor, de modo que se envíe una actualización parcial al servicio web.
        // await sendRequest("PATCH", `/api/results/${id}`, 
        //     Object.fromEntries(Object.entries(value).filter(([p, v]) => v !== "")));
        await sendRequest("PATCH", `/api/results/${id}`,
            Object.entries(values).filter(([p,v]) => v !== "")
            .map(([p,v]) => ({op: "replace", patch:"/" + p, value:v})),
            "application/json-patch+json");
    },
    "Exit": () => process.exit()
}

const sendRequest = async(method, url, body, contentType) => {
    // const response = await fetch(baseUrl + url, {
    //     method, headers: {"Content-Type": contentType ?? "application/json"},
    //     body: JSON.stringify(body)
    // });

    // if(response.status == 200){
    //     const data = await response.json();
    //     (Array.isArray(data)?data: [data]).forEach(elem => console.log(JSON.stringify(elem)));
    // }
    // else{
    //     console.log(response.status + " " + response.statusText);
    // }
    const headers = { "Content-Type": contentType?? "application/json"};
    if(bearer_token){
        headers["Authorization"] = "Bearer" + bearer_token;
    }

    const response = await fetch(baseUrl + url, {
        method, headers, body: JSON.stringify(body)
    });

    if(response.status == 200){
        const data = await response.json();
        (Array.isArray(data) ? data: [data]).forEach(elem => console.log(JSON.stringify(elem)));
        return data;
    }
    else{
        console.log(response.status + "" + response.statusText);
    }
}