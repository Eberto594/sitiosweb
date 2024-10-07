//USO DEL OBJETO "GLOBAL"
function createGlobal(){
    global.myName = 'Peter';
}

createGlobal();
console.log(myName);