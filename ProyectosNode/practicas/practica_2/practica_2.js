//PROBLEMA 1
//¿En qué situación utilizarías un objeto de conjunto en lugar de un arreglo?
let arreglo = ["hola", "que", "que", "hace"]
console.log(arreglo)
let set = new Set()
set.add("hola")
set.add("que")
set.add("que")
set.add("hace")
console.log(set)

//PROBLMEA 2
//como se agregan y eliminan elementos en un conjunto
let conjunto = new Set()
conjunto.add("uno")
conjunto.add("dos")
conjunto.add("tres")
conjunto.add("cuatro")
console.log(conjunto)
conjunto.delete("tres")
console.log(conjunto)

//PROBLEMA 3
//Como se eliminan todos los elementos de un conjunto
conjunto.clear()
console.log(conjunto)

//PROBLEMA 4
//cual es la diferencia entre los metodos de llaves y valores
let newConjunto = new Set()
newConjunto.add("mesa", "silla", "sillon")
newConjunto.add("silla")
newConjunto.add("sillon")
let getKeys = newConjunto.keys()
let getValues = newConjunto.values()
console.log(getKeys)
console.log(getKeys.next())
console.log(getKeys.next())
console.log(getKeys.next())


console.log(getValues)
console.log(getValues.next())
console.log(getValues.next())
console.log(getValues.next())

//NOTA: Los dos metodos son exactamente iguales


//PROBLEMA 5
//Como funciona el metood forEach con un objeto de conjunto
//retomando el conjunto del problema anterior
newConjunto.forEach((valor, clave, set)=>{
    console.log(`${valor}`)
})


//PROBLEMA 6
//Cuales son las ventajas de usar un mapa en lugar de un objeto
/*
    Se tiene que usar un mapa cuando los datos se pueden clasificar dada una llave
    a la cual se le puede asignar un valor. 

*/

//PROBLEMA 7
//Como se agregan y eliminar elementos de un mapa
let map = new Map()
map.set("llave_uno","valor_uno")
map.set("llave_dos","valor_dos")
map.set("llave_tres","valor_tres")
console.log(map)

map.delete("llave_dos")
console.log(map)

//PROBLEMA 8
//Como se determina si existe una llave en un mapa
//retomando el mapa del problema anterior
let llave = map.has("llave_cuatro")
console.log(llave)

//PROBLEMA 9
//Como se obtienen todas las llaves de un objeto de mapa
//retomando el mapa del problema anterior
map.forEach((valor,clave,map)=>{
    console.log(`${clave}  ${valor}`)
})

//PROBLEMA 10
//Como se obtiene acceso al valor de cada llave mediante el metodo Values
let mapValues = map.values()
map.forEach(()=>{
    console.log(mapValues.next())
})