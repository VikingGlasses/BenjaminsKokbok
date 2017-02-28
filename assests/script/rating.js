"use strict";
// api nyckel: 2fd088b660946194
// GET https://edu.oscarb.se/sjk15/api/recipe/?api_key=2fd088b660946194&recipe=hallongrotta
// GET https://edu.oscarb.se/sjk15/api/recipe/?api_key=2fd088b660946194&recipe=hallongrotta&rating=4

var recipe = "hallongrotta";
var votesElement = document.getElementById("votes");
var starElements = document.getElementsByClassName("star");
// TODO spara användarens rating lokalt
var rating = 0;


window.onload = function() {
	getRating(recipe);
	for (var i = 0; i < starElements.length; i++) {
		var element = starElements[i];
		element.addEventListener("mouseover", mouseOverStar, false);
		element.addEventListener("mouseout", mouseLeftStar, false);
		element.addEventListener("click", clickedStar, false);
	}

};

function clickedStar() {
	rating = eval(this.id.substring(this.id.length - 1));
	vote(recipe, rating);
	getRating(recipe);
}

function mouseOverStar() {
	var index = eval(this.id.substring(this.id.length - 1)) - 1;
	for (var i = 0; i < starElements.length; i++) {
		var element = starElements[i];
		if (i <= index) {
			element.innerHTML = '&starf;';
		} else {
			element.innerHTML = '&star;';
		}
	}
}

function mouseLeftStar() {
	for (var i = 0; i < starElements.length; i++) {
		var element = starElements[i];
		if (i <= rating - 1) {
			element.innerHTML = '&starf;';
		} else {
			element.innerHTML = '&star;';
		}
	}
}

function setVotes(obj) {
	var str = obj.votes + " Röster (" + obj.rating.toFixed(2) + " i betyg)";
	votesElement.innerHTML = str;
	if (rating === 0) {
		rating = obj.rating.toFixed(0);
		mouseLeftStar();
	}
}

function vote(recipe, rating) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			return (JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET",
		"https://edu.oscarb.se/sjk15/api/recipe/?api_key=2fd088b660946194&recipe=" + recipe + "&rating=" + rating,
		true);
	xhttp.send();
}

function getRating(recipe) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			setVotes(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET",
		"https://edu.oscarb.se/sjk15/api/recipe/?api_key=2fd088b660946194&recipe=" + recipe,
		true);
	xhttp.send();
}
