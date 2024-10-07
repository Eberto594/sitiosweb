//DECLARACION DE DESESTRUCTURACION
const person = {
    name: 'Lisa',
    age: 32
};

const { name , age } = person;
console.log('Name: ', name);
console.log('Age: ', age);

const person2 = ['John', 17];
const [name2, age2] = person2;

console.log('Name: ', name2);
console.log("Age: ", age2);