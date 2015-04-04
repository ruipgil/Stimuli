var MS_PER_YEAR = 31556900000;

function showAge(birth) {
	var now = new Date();
	var diff = ('' + ((now - birth)/MS_PER_YEAR)).split('.');
	var year = diff[0];
	var mili = diff[1];

	document.querySelector('.age').style.display = 'block';
	document.querySelector('.question').style.display = 'none';

	document.querySelector('.data-year').innerText = year;
	document.querySelector('.data-mili').innerText = mili;
}

var load;

function askAge() {
	document.querySelector('.age').style.display = 'none';
	document.querySelector('.question').style.display = 'block';

	document.querySelector('.question #ok').addEventListener('click', function() {
		var value = document.querySelector('.question #date-input').value.split("/").map(function(elm){ return Number(elm); });
		localStorage.setItem('birthdate', new Date(value[2], value[1]-1, value[0]).getTime());
		load();
	})
}

load = function () {
	if(localStorage.getItem('birthdate')) {
		showAge(new Date(Number(localStorage.getItem('birthdate'))));
	} else {
		askAge();
	}
}

window.addEventListener('load', function() {
	load();
});