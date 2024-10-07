//misma funcion que la anterior, pero no se toma como
//referencia al primer niño, simplemente se pasa
//directamnente a la compracion
var largest_age = function(age_array) {
	var the_largest = 0;
	for(var i = 0; i < age_array.length; i++) {
		if(age_array[i] > the_largest) {
			the_largest = age_array[i];
		}
	}

	return the_largest; 
};

