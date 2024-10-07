// let x = 1;
// while (x < 10){
//     console.log(x)
//     ++x;
// }

// let y = 1;
// do{
//     console.log("Hello World");
// }while(x < 1)

// for(let x = 1; x < 10; ++x){
//     console.log(x)
// }

// for(let x = 0; x < 20; x += 2){
//     if(x === 10) break
//     console.log(x)
// }

// for(let x = 0; x < 20; x += 2){
//     if(x === 10) continue
//         console.log(x)
// }

// xLoop: for(let x = 1; x < 4; x += 2){
//     yLoop: for(let y = 1; y < 4; y += 2){
//         console.log(`xLoop: ${x * y}`)
//     }
//     console.log(`yLoop: ${x}`)
// }

//ESTE CICLO NO IMPRIME NADA
// xLoop: for(let x = 1; x < 4; x += 2){
//     yLoop: for(let y = 1; y < 4; y += 2){
//         if(x === 1 || x === 3) break xLoop;
//         console.log(`xLoop: ${x * y}`)
//     }
//     console.log(`yLoop: ${x}`)
// }

// xLoop : for(let x = 1; x < 4; x += 2){
//     yLoop: for(let y = 1; y < 4; y += 2){
//         if(x === 2) break xLoop;
//         console.log(`xLoop: ${x * y}`)
//     }
//     console.log(`yLoop: ${x}`)
// }

// let myArray = ["banana", "pineapples", "strawberries"]
// console.log(`I have 1 ${myArray[0]}`)
// console.log(`I have 2 ${myArray[1]}`)
// console.log(`I have 3 ${myArray[2]}`)

// let x = ["lightning", "squid", "speaker"]
// for(let item of x){
//     console.log(item)
// }

// let x = []
// x[5] = "some value"
// for(let item of x){
//     console.log(item)
//     //Whill show:
//     //undefined, undefined, undefined, undefined
//     //"some value"
// }

// for(let item in x){
//     console.log(item)
//     //Will show 5
// }

// let x = ["lightning", "squid", "speaker"]
// x.forEach(function (item, index, array) {
//     console.log(`${item} is at index ${index}`)
// })

// for(let item of "hello"){
//     console.log(item)
// }

// console.log(Array.prototype)

// let myArray = ["lightning", "apple", "squid", "speaker"]
// let getIterator = myArray[Symbol.iterator]()
// console.log(getIterator)

// let myArray = ["lightning", "apple", "squid", "speaker"]
// let getIterator = myArray[Symbol.iterator]()
// console.log(getIterator.next())
// console.log(getIterator.next())
// console.log(getIterator.next())
// console.log(getIterator.next())
// console.log(getIterator.next())

let myObject = {
    firstName :"John",
    lastName: "Doe",
    age: 140
}

// let myObjectKeys = Object.keys(myObject)
// for(let item of myObjectKeys){
//     console.log(item)
// }

// let myObjectEntries = Object.entries(myObject)
// console.log(myObjectEntries)

// let myObjectEntries = Object.entries(myObject)
// for(const [key, value] of myObjectEntries){
//     console.log(`The key ${key} has a value ${value}`)
// }

let myNumber = 5
setTimeout(function(){
    console.log("Hello World")
}, 1000)