//con semicolons
console.log("Hola Mundo");
console.log("Adios Mundo!");

//sin semicolons
console.log("Hola Mundo")
console.log("Adios Mundo")

console.log(5 + 
    6)
let myVariable = 5
if(myVariable === 5){
    console.log("The variable is 5!!")
}

let variable = 5;
{
    let variable = 10;
    console.log(variable)
}
console.log(variable)

var Varible = 5;
var Variable = 10;
console.log(Variable)

const myConst = 5;
console.log(myConst);

//MUTACION DE VARIABLES CONST
const myArray = ["Some", "set", "of", "content"];
myArray.push("new data!!")
console.log(myArray)

let VAriable = "hello"
let myOtherVariable = "world"
let combine = myArray + myOtherVariable // "hello world"

// let VAriable = "5"
// let myOtherVariable = 5
// let combine = myArray + myOtherVariable // "55"


//USO DE PLANTILLAS
let MYVARIABLE = `hello world
!!
how are you??`

let someWord = "World"
let MyVariable = `hello ${someWord}!!`
console.log(MyVariable)

let number = 5;
if(number === 5)
    console.log("The variable is 5")
else
    console.log("The variable is not 5")

let number_two = 5;
if(number_two === 5)
    console.log("The variable is 5")
else if(number_two === 6){
    number_two = 7;
    console.log("The variable is 6, but I set it to 7!!")
}
else
    console.log("The variable is not 5")

//swiTCH
let x = 5;
switch(x){

    case 4: 
        console.log("4!!");
        break;
    case 5:
        console.log("hello");
        break;
    case 6:
        console.log("goodbye");
        break;

}

let y = 5;
//Returns "Big Number"
let z = y > 3? "Big number": "Small number";