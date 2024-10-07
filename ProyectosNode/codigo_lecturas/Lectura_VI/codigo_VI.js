// function myFunction(){
//     return "Hello World"
// }
// console.log(myFunction())

// function words(word1, word2){
//     return word1 + " " + word2
// }

// console.log(words("Hello", "Jonh"))
// console.log(words("Hello", "Jake"))
// console.log(words("Good bye", "Alice"))

// function word(word1, word2){
//     return word1 + " " + word2
// }

// let validWords = ["Hello", "John"]
// console.log(word(...validWords))

// let Words = function(word1, word2){
//     return word1 + " " + word2
// }

// console.log(Words("Hello", "World"))

// let wordFunctions = {
//     words : function (word1, word2) {
//         return word1 + word2
//     }
// }

// //(function(word1, word2){return word1 + " " + word2})("Hello", "World")

// let wordss = (word1, word2) => {
//     return word1 + " " + word2
// }
// console.log(wordss("Hello", "John"))

// console.log(this)
// let wordsss = function (word1, word2) { 
//     console.log(this)
//     return word1 + word2
// }

// "use strict"
// console.log(this)
// let Wordss = function (word1, word2) { 
//     console.log(this)
//     return word1 + word2
// }

// console.log(this)
// let Wordsss = () => {
//     console.log(this)
// }
// Wordsss()

// +"use strict"
// let contextualFunction = function(){
//     let words = () => {
//         console.log(this)
//     }
//     words()
// }
// contextualFunction()

"use strict"
let words = function (word, punctuation) {
    return this.keyword + " " + word + punctuation
}

let wordContext = {keyword : "Hello"} 
// let helloWorld = words.call(wordContext, "World!", "!")
// console.log(helloWorld)

// let helloWorld = words.apply(wordContext,["World", "!"])
// console.log(helloWorld)

// let boundWord = words.bind(wordContext)
// let helloWorld = boundWord("World", "!")
// let goodbye = boundWord("Goodbye", "!")
// console.log(helloWorld)
// console.log(goodbye)

// let myFunction = function(name, age, country){
//     console.log(this)
// }

// let newFuction = new myFunction("John", 24,"Britain")

// let myFunction = function(name, age, country){
//     this.assignedName = name
//     this.assignedAge = age
//     this.assigneeCountry = country
//     console.log(this)
// }

// let newFuction = new myFunction("John", 24, "Britain")
// console.log(newFuction)

// let User  = function(firstName, lastName, age){
//     this.fullName = firstName + " " + lastName
//     this.age = age;
// }

// let userOne = new User("John", "Big", 24)
// console.log(userOne)
// let userTwo = new User("John", "Small", 24)
// console.log(userTwo)

//PARA VERIFICAR SI SE HA OCUPADO LA PALABRA NEW
// let User = function(firstName, lastName, age){
//     if(new.target){
//         this.fullName = firstName + " " + lastName
//         this.age = age
//     }
//     else
//         return "Hello World"
// }

// let userOne = new User("John", "Big", 24)
// console.log(userOne)
// let userTwo = new User("John", "Small", 24)
// console.log(userTwo)w ,ujjnvnvn

// let User = function (firstName, lastName, age) {
//     this.fullName = firstName + " " + lastName
//     this.age = age
// }

// User.prototype.giveName = function(){
//     return `My name si ${this.fullName}`
// }

// let userOne = new User("John", "Big", 24)
// console.log(userOne.giveName())

// let Animals = {
//     value: ["dog", "cat"],
//     get listAnimals(){
//         return this.value
//     },
//     set newAnimal(name){
//         this.value.push(name)
//         console.log("New animal added: " + name)
//     }
// }

// Animals.newAnimal = "sheep"
// console.log(Animals.listAnimals)

// function* somGenerator(x){
//     let index = 0
//     while(true){
//         yield x * 10 * index
//         ++index
//     }
// }

// const runG = somGenerator(5)
// console.log(runG.next())
// console.log(runG.next())

// function* somGenerator(x) {
//     let index = 0
//     while(true){
//         yield x * 10 * index
//         return 5
//     }
// }

// const runG = somGenerator(5)
// console.log(runG.next())
// console.log(runG.next())

// let myClass = class {
//     constructor(name){
//         console.log(name)
//     }
// }

// new myClass("hello")

// let myFunction = function(name){
//     console.log(name)
// }

// new myFunction("Hello")

// let HotSauce = class{
//     //Fields here are added to this, so they are avaible
//     //via this.units and this.maxHotness in methods
//     units = "scoville"
//     maxHotness = 20000000
//     constructor(name, hotness){
//         //We can assing arguments form new instances of
//         //our class to this as well
//         this.hotness = hotness
//         this.name = name
//     }
    
//     getName(){
//         if(this.hotness < this.maxHotness){
//             return `${this.name} is ${this.hotness}`
//         }
//         else{
//             return `${this.name} is too hot!`
//         }
//     }
// }

// let newSauce = new HotSauce("Chilli Wave", 4600)
// // console.log(newSauce.getName())
// newSauce.getName = function () { 
//     return "Not Hot Sauce for you!!"
// }

// console.log(newSauce.getName())

// let Utily = class {
//     static className = "Utility Functions"
//     static author = "Some Author"

//     static classDetails(){
//         return `${this.className} by ${this.author}`
//     }
// }
// console.log(Utily.classDetails())

// let Utility = class{
//     static className = "Utility Functions"   
//     static author = "Some Author"
//     static {
//         this.author = "Hello World"
//     }
//     static classDetails(){
//         return `${this.className} by ${this.author}`
//     }
// }

// Utility.classDetails()

// let myClass = class{
//     #privateField = 1
// }

// let newClass = new myClass()

// let HotSauce = class{
//     //Fields here are added to this, so they are avaible
//     //via this.units and this.maxHotness in methods
//     units = "scoville"
//     maxHotness = 20000000
//     constructor(name, hotness){
//         //We can assing arguments form new instances of
//         //our class to this as well
//         this.hotness = hotness
//         this.name = name
//     }
    
//     getName(){
//         if(this.hotness < this.maxHotness){
//             return `${this.name} is ${this.hotness}`
//         }
//         else{
//             return `${this.name} is too hot!`
//         }
//     }
// }

// class VeganHotSauce extends HotSauce{
//     constructor(meat, name, hotness){
//         super(name, hotness)
//         this.meat = meat
//     }
//     checkMeatContent(){
//         if(this.meat){
//             return "This is not vegan"
//         }
//         else{
//             return "no meat detected"
//         }
//     }
// }

// let newVeganOption = new VeganHotSauce(false, "VeganLite", 2400)
// console.log(newVeganOption)

let HotSauce = class{
    //Fields here are added to this, so they are avaible
    //via this.units and this.maxHotness in methods
    units = "scoville"
    maxHotness = 20000000
    constructor(name, hotness){
        //We can assing arguments form new instances of
        //our class to this as well
        this.hotness = hotness
        this.name = name
    }
    
    getName(){
        if(this.hotness < this.maxHotness){
            return `${this.name} is ${this.hotness}`
        }
        else{
            return `${this.name} is too hot!`
        }
    }
}

class VeganHotSauce extends HotSauce{
    constructor(meat, name, hotness){
        super(name, hotness)
        this.meat = meat
    }
    checkMeatContent(){
        if(this.meat){
            return "This is not vegan... but" + super.getName()
        }
        else{
            return "no meat detected... and" + super.getName()
        }
    }
}

let newVeganOption = new VeganHotSauce(false, "VeganLite", 2400)
console.log(newVeganOption.checkMeatContent())