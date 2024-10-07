var myvar = 3; // Global variable

var my_function = function(){
	let myvar = 5; // This version of myvar is now *local*
};

//alert("myvar = " + myvar);
console.log("myvar = " + myvar);
my_function();
//alert("After calling my_function, myvar = " + myvar); 
console.log("After calling my_function, myvar = " + myvar);

