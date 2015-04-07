var MS_PER_YEAR = 31556900000;
var birth;

function showAge() {
	document.querySelector('.age').style.display = 'block';
	document.querySelector('.question').style.display = 'none';
}

function updateAge() {
	var now = new Date();
	var diff = ((now - birth)/MS_PER_YEAR).toFixed(9).split('.');
	var year = diff[0];
	var mili = diff[1];

	document.querySelector('.data-year').innerText = year;
	document.querySelector('.data-mili').innerText = mili;	
}

var load;

function askAge() {
	document.querySelector('.age').style.display = 'none';
	document.querySelector('.question').style.display = 'block';
	document.querySelector('.question #date-input').autofocus = true;

	document.querySelector('.question #date-input').addEventListener('keypress', function(e) {
		if(e.keyCode===13){
			var value = document.querySelector('.question #date-input').value.split("-").map(function(elm){ return Number(elm); });
			var date = new Date(value[0], value[1]-1, value[2]);
			if(!isNaN(date.getTime())){
				localStorage.setItem('birthdate', date.getTime());
				load();
			}
		}
	});
}

function setTextColor(color) {
	document.querySelector('#year').style.color = color;
	document.querySelector('#mili').style.color = color;
}

function setBackgroundImage(index){
	var bg = BACKGROUNDS[index];

	document.body.style.backgroundColor = 'black';
	if(bg) {
		var url = bg.url.split('/');
		document.body.style.backgroundImage = 'url(./photos/'+url[url.length-1]+')';
		document.querySelector('#image-credit').href = bg.creditUrl || bg.source;
		document.querySelector('#image-credit').innerText = bg.credit || 'uncredited';
		setTextColor(bg.color || 'white');
		document.body.style.backgroundSize = 'cover';
	}else{
		setTextColor('white');
	}
}

function updateBackgroundImage() {
	var index = Math.floor(Math.random()*BACKGROUNDS.length);
	setBackgroundImage(index);
	
}

load = function () {
	if(localStorage.getItem('birthdate')) {
		showAge();
		birth = new Date(Number(localStorage.getItem('birthdate')));
		updateAge();
		updateBackgroundImage();
	} else {
		askAge();
	}
}

var frame;

function startCycle() {
	frame = setInterval(function() {
		updateAge();
	}, 100);
}

function stopCycle() {
	clearTimeout(frame);
}

window.addEventListener('load', function() {
	load();
});