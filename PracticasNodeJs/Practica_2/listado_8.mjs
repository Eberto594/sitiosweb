//USO DE LA FUNCION "SETINTERVAL"

let counter = 1;
const interval = setInterval(() => {
    console.log(`${counter} iteration`);
    if(counter ++ > 2){
        clearInterval(interval);
    }
},1000);