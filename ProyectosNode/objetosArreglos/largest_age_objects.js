//funcion para sacar la edad mas grande dado un arreglo de niños
var largest_age = function(child_array) {
	//variable auxiliar
	var the_largest = 0;
	//ciclo for para recorrer el arreglo
	for(var i = 0; i < child_array.length; i++) {
		//se toma como referencia el primer niño
		var child = child_array[i];
		//se compara al edad del niño actual con la variable auxiliar que contiene 
		if(child.age > the_largest) {
			//si el niño actual es mas grande se actualiza la variable auxiliar
			the_largest = child.age;
		}
	}

	return the_largest; 
};


