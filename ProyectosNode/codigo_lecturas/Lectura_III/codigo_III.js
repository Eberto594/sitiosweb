var myArray = ["one", 2, "three", {"value": "four"}];
//ley myArray = new Array("one", 2, "three", {"value": "four"}) misma manera

var MyArray = ["banana", "apple", "squid", "cake", "pear"];
console.log(MyArray[0]);
console.log(MyArray[2]);
console.log(MyArray[3]);

var myArr = ["one", 2, "three","four"];
var arrayLength = myArr.length// show 4
console.log(myArr[arrayLength - 1])
console.log(myArr.at(-1)) // hace lo mismo que el anterior

//MyArray.push("pear");
console.log(MyArray)
MyArray.unshift("pear")
console.log(MyArray)

console.log(MyArray.pop())
console.log(MyArray.shift())
console.log(MyArray)

MyArray.splice(1)
console.log(MyArray)

var myArr = ["banana", "apple", "squid", "cake"];
myArr.splice(1)
console.log(myArr)

var myArr = ["banana", "apple", "squid", "cake"];
myArr.splice(1,2)
console.log(myArr)

var myArr = ["banana", "apple", "squid", "cake"];
myArr.splice(1,2);
console.log(myArr);
myArr.splice(1,0,"strawberry", "box");
console.log(myArr)


//NOTACION LITERAL
let myObject = {
    "key" : "value",
    "someKey" : 5,
    "anotherKey" : true
}


//NOTACION NO LITERAL
let myObject_2 = new Object();
myObject_2.key = "value"
myObject_2.someKey = 5
myObject_2.anotherKey = true

//Acceso a los datos 
console.log(myObject["key"]);
console.log(myObject.key)

let MyObject = {
    "key": "value",
    "someKey": 5,
    "anotherKey" : true
    }
let keyName = "key"
console.log(MyObject[keyName]) // shows "value"
console.log(MyObject.keyName) // shows undefined

const MYobjet = {
    z : 5,
    y: 4,
    x: 3
}

// const {x, y} = MYobjet
// console.log(y)

const MyOBject = {
    z : undefined,
    y : 4,
    x : 3
}

// const {z = 5} = MyOBject
// console.log(z)

const {x, ...rest} = MyOBject
console.log(rest);

let myOBJECT = {
    "key" : "value",
    "someKey" : 5,
    "anotherKey" : true
}

myOBJECT["key"] = "NEW VALUE";
console.log(myOBJECT["key"]);
myOBJECT["aNewKey"] = "Some Value";
console.log(myOBJECT["aNewKey"])

let newObject = {
    "key" : {
        "key" : 5,
        "newKey" : "value"
    },
    "someKey": 5,
    "anotherKey" : true
}

console.log(newObject["key"]["newKey"]);
console.log(newObject.key.newKey)

let newOBject = {
    "name" : "John"
}

Object.freeze(newOBject)
newOBject["age"] = 5;
newObject["name"] = "Johnny"
console.log(newOBject)

let NewObject = {}
Object.defineProperty(NewObject, "name",{
    value: "John",
    writable: false,
})

console.log(NewObject)


let animals = ["cats", "dogs"];
let animals2 = ["pigeons"];
let allAnimals = [...animals, ...animals2]
console.log(allAnimals)

let user1 = {
    "name" : "John",
    age: 24
}

let user2 = {
    "name" : "Joe"
}

let combineUser = {...user1, ...user2}
console.log(combineUser)

let Animals = ["dog", "cat"];
let objectAnimals = {...Animals}
console.log(objectAnimals)

console.log(Array.prototype)