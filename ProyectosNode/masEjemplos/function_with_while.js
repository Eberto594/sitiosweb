let sum_range = function(range_start, range_end) {
	let sum = 0;
	for(let num = range_start; num <= range_end; num += 1) {
		sum += num;
	}
	return sum;
};

//var start_val = parseInt(prompt("Enter the first number"));
//var end_val = parseInt(prompt("Enter the last number"));
var start_val = 10;
var end_val = 20;

var result = sum_range(start_val, end_val);
//alert("The sum of all of the numbers between " + start_val + " and " + end_val + " is " + result);
console.log("The sun of all of the numbers between " + start_val + " and " + end_val + " is " + result);
