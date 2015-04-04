var MS_PER_YEAR = 31556900000;
var byear, bmonth, bday;
var birth = new Date(byear, bmonth, bday);

function update() {
	var now = new Date();
	var diff = ('' + ((now - birth)/MS_PER_YEAR)).split('.');
	var year = diff[0];
	var mili = diff[1];

	document.querySelector('.data-year').innerText = year;
	document.querySelector('.data-mili').innerText = mili;
}

window.addEventListener('load', function() {
	update();
});