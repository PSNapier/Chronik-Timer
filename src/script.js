"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// toolbox
function matchy(str, regex) {
    if (str.match(regex) !== null) {
        return str.match(regex)[0];
    }
    else {
        return '';
    }
}
// setup page
document.getElementById('clock').innerText = '0:00';
document.documentElement.style.cssText = '--secondsPseudo: \':00\'';
// time object
var time = {
    hour: 0,
    minute: 0,
    second: 0,
};
// get user inputted time
function getTime() {
    var input = document.getElementById('clock').innerText;
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
    time.second = 0;
}
// play button
var playing = false;
var simplifiedTime;
var intervalId;
function playButton() {
    var _a;
    if (simplifiedTime === undefined) {
        simplifiedTime = time.hour * 3600 + time.minute * 60 + time.second;
    }
    (_a = document.getElementById('playIcon')) === null || _a === void 0 ? void 0 : _a.classList.toggle('highlight');
    playing = !playing;
    if (playing) {
        intervalId = setInterval(countUp, 1000);
    }
    else {
        clearInterval(intervalId);
    }
}
// playButton() countDown() variation
// function playButton() {
// 	simplifiedTime = time.hour * 3600 + time.minute * 60 + time.second;
// 	if (simplifiedTime === 0) { return; }
// 	document.getElementById('playIcon')?.classList.toggle('highlight');
// 	playing = !playing;
// 	if (playing) { 
// 		intervalId = setInterval(countDown, 1000);
// 	} else { 
// 		clearInterval(intervalId); 
// 	}
// }
// reset button
function resetButton() {
    if (playing) {
        playButton();
    }
    simplifiedTime = 0;
    updater();
}
// counting 
function countDown() {
    if (simplifiedTime === 0) {
        playButton();
        return;
    }
    simplifiedTime -= 1;
    updater();
}
function countUp() {
    simplifiedTime += 1;
    updater();
}
// time formatter
var timeFormatted = {
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
    var totalSeconds = simplifiedTime;
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
