var square_a_number = function(num) {
	let value = num * num;
	return value;
};

var sum_squares_for_range = function(range_start, range_end) {
	let sum = 0;

	for(var num = range_start; num <= range_end; num += 1) {
		sum += square_a_number(num);
	}
	return sum;
};
//alert("The sum of squares between 2 and 5 is " + sum_squares_for_range(2, 5));
console.log("The sum of square between 2 and 5 is " + sum_squares_for_range(2,5));
