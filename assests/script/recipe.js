"use strict";

var ingredients = [];

{
	var input = document.getElementById("multiplier");
	input.addEventListener("change", changeAmount, false);
	var elements = document.getElementsByClassName("amount");
	for (var i = 0; i < elements.length; i++) {
		ingredients.push(new ingredient(elements[i]));
		ingredients[i].update(input.value);
	}
};

function changeAmount() {
	for (var i = 0; i < ingredients.length; i++) {
		ingredients[i].update(this.value);
	}
}

function ingredient(element) {
	this.element = element;
	this.amount = element.innerHTML;
	this.update = function(multiplier) {
		this.element.innerHTML = eval(this.amount + "*" + multiplier);
	};
}
