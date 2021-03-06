// toolbox
function matchy(str, regex) {
	if (str.match(regex) !== null) { return str.match(regex)[0]; }
	else { return ''; }
}

// setup page
document.getElementById('clock').innerText = '0:00';
document.documentElement.style.cssText = '--secondsPseudo: \':00\'';

window.onload = function() {
	document.body.focus();
};

// time object
let time = {
	hour: 0,
	minute: 0,
	second: 0,
};

// get user inputted time
function getTime() {
	let input = document.getElementById('clock').innerText;
	if (input === null || input === '')
		return;
	if (input.search(':') !== -1) {
		time.hour = parseInt(matchy(input, /\d+(?=:)/)) || 0;
		time.minute = parseInt(matchy(input, /(?<=:)\d+/)) || 0;
	}
	else {
		time.hour = 0;
		time.minute = parseInt(matchy(input, /\d+/)) || 0;
	}
	time.second = timeFormatted.num.second;
}

function simplifyTime(timeObject) {
	return timeObject.hour * 3600 + timeObject.minute * 60 + timeObject.second;
}

// space keydown
function watchSpace(event) {
	var x = event.keyCode;
	if (x == 32) {  // 32 is the space key
	  playButton();
	}
}

// play button
let playing = false;
let simplifiedTime;
let mode;
let intervalId;
let startDate;
function playButton() {
	let _a;
	
	getTime();
	simplifiedTime = simplifyTime(time);
	
	date = new Date();
	startDate = (date.getHours() * 60) * 60 + date.getMinutes() * 60 + date.getSeconds() - simplifiedTime;

	(_a = document.getElementById('playIcon')) === null || _a === void 0 ? void 0 : _a.classList.toggle('highlight');
	playing = !playing;

	if (playing) {
		document.getElementById('clock').contentEditable = 'false';
		document.getElementById('resetIcon').disabled = true;
		// document.getElementById('modeIcon').disabled = true;
		intervalId = setInterval(mode, 1000);
	} else {
		document.getElementById('clock').contentEditable = 'true';
		document.getElementById('resetIcon').disabled = false;
		// document.getElementById('modeIcon').disabled = false;
		clearInterval(intervalId);
	}
}

// reset button
function resetButton() {
	if (playing) { playButton(); }
	time.hour = 0;
	time.minute = 0;
	time.second = 0;
	simplifiedTime = 0;
	updater();
}

// mode button
mode = countUp;
function modeButton() {
	if (playing) { return; }
	if (mode === countUp) { 
		mode = countDown; 
	} else { mode = countUp; }
}

// counting 
// NOTE: not sure how to go about implementing count-down with the date reference, disabled for now
function countDown() {
	if (simplifiedTime === 0) {
		playButton();
		alert('Time is up!');
		return;
	} else {
		date = new Date();
		endDate = (date.getHours() * 60) * 60 + date.getMinutes() * 60 + date.getSeconds();
		simplifiedTime =  endDate - startDate;
	}
	updater();
}

function countUp() {
	date = new Date();
	endDate = (date.getHours() * 60) * 60 + date.getMinutes() * 60 + date.getSeconds();
	simplifiedTime = endDate - startDate;
	updater();
}

// time formatter
let timeFormatted = {
	num: {
		hour: 0,
		minute: 0,
		second: 0,
	},
	str: {
		hour: '0',
		minute: '0',
		second: '0',
	}
};

function formatZeroes(str) {
	return str.length === 1 ? "0" + str : str;
}

function formatter() {
	let totalSeconds = simplifiedTime;
	timeFormatted.num.hour = totalSeconds / 3600 >= 1 ? Math.floor(totalSeconds / 3600) : 0;
	totalSeconds -= timeFormatted.num.hour * 3600;
	timeFormatted.num.minute = totalSeconds / 60 >= 1 ? Math.floor(totalSeconds / 60) : 0;
	totalSeconds -= timeFormatted.num.minute * 60;
	timeFormatted.num.second = totalSeconds;
	timeFormatted.str.hour = timeFormatted.num.hour.toString();
	timeFormatted.str.minute = formatZeroes(timeFormatted.num.minute.toString());
	timeFormatted.str.second = formatZeroes(timeFormatted.num.second.toString());
}

// update GUI
function updater() {
	formatter();
	document.getElementById('clock').innerText = timeFormatted.str.hour + ":" + timeFormatted.str.minute;
	document.documentElement.style.cssText = "--secondsPseudo: ':" + timeFormatted.str.second + "'";
}