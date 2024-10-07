// PROBLEMA 1
// como se accede a los elmentos de un arreglo y obtener sus valores
let myArray = ["uno", "dos", "tres"]
console.log(myArray[0])

//PROBLEMA 2
//Deseas realizar el siguimiento del contenido de uan tabla, en la que
//una dimension representa las filas y las columnas
let myArrayMultidimencional = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
console.log(myArrayMultidimencional)

//PROBLEMA 3
//Deseas invertir el orden de los elementos de un arreglo
let array = ["manzana", "piña", "pera"]
let arrayInvertido = array.reverse()
console.log(arrayInvertido)

//PROBLEMA 4
//Necesitas una forma rapida de cambiar lso elementos del arreglo
//agrendando o eliminando elmentos
let newArray = ["Alberto", "Alguien", "Erick", "Said", "Montse", "Jony"]
console.log(newArray[1])//Imprime alguien
newArray.splice(1,2, "Eber") //sustituye a Alguien por Eber
console.log(newArray)

//PROBLEMA 5
//Como se puede simular el comportamiento de primer en entrar,
//primero en salir?
let queue = ["Alberto", "Alguien", "Erick", "Said", "Montse", "Jony"]
console.log(queue) // aun esta Alberto dentro del arreglo
queue.shift(); // se saca el primer elemento del arreglo
console.log(queue) // se empieza a partir de Alguien

//PROBLEMA 5.1
//como se puede simular el comportamiento de ultimo en entrar,
//primero en salir
let stack = ["Alberto", "Alguien", "Erick", "Said", "Montse", "Jony"]
console.log(stack)
stack.pop()
console.log(stack)

//PROBLEMA 6
//Como se ejecuta una funcion para cada elemnto en orden
//ascendente
let newArreglo = ["Alberto", "Alguien", "Erick", "Said", "Montse", "Jony"]
newArray.forEach(function(item, index, array){
    console.log(`${item} esta en la clase de Sitios Web`)
})

//PROBLEMA 7
//cual es la diferencia entre un constructor de objetos
//y un objeto literal
let myObjeto_literal = {
    "Nombre" : "Eber",
    "Edad": 20
}
console.log(myObjeto_literal)

let myObjeto_no_literal = new Object();
myObjeto_no_literal.Nombre = "Erick"
myObjeto_no_literal.Edad = 21
console.log(myObjeto_no_literal)

//PROBLEMA 8
//Como se accede a las propiedades de un objeto y se configuran
console.log(myObjeto_literal["Nombre"])//para objetos literales
console.log(myObjeto_no_literal.Nombre)//para objetos no literales

myObjeto_literal["Nombre"] = "Alberto"
myObjeto_no_literal.Nombre = "Tiberio"

console.log(myObjeto_literal["Nombre"])//para objetos literales
console.log(myObjeto_no_literal.Nombre)//para objetos no literales

//PROBLEMA 9
//Quieres saber cuando utilizar un objeto
//en lugar de un arreglo
/*
    Aqui depende mucho del problema que pretendes dar solucion.
    Los objetos se deben ocupar cuando el arreglo no satisface
    la necesidad, entonces debemos enriquecer un nuevo tipo de dato,
    es cuando aparecen los objetos . Estos pueden tener varios tipos
    primitivos generando un nuevo dato enriquesido
*/

//PROBLEMA 10
//Deseas crear propiedades personalizades en un objeto
let newObjeto = {}

Object.defineProperty(newObjeto, "Nombre",{
    value : "Jony",
    writable: false //No se puede modifiar
})

console.log(newObjeto["Nombre"])//Imprime Jony
newObjeto["Nombre"] = "Montse" // Se trata de modificar pero no se puede
console.log(newObjeto["Nombre"]) //Imprime Jony