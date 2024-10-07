var myvar = 3; // Global variable

var my_function = function() {
	myvar = 5; // Writing to a global variable
};

//alert("myvar = " + myvar);
console.log("myvar = " + myvar);
my_function();
//alert("After calling my_function, myvar = " + myvar); 
console.log("After calling my_fuction, myvar = " + myvar);

