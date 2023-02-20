// TIMER
var timer = document.getElementById('timer');
var timeLeft = 3;
// var elem = document.getElementById('some_div');


var timerId = setInterval(countdown, 1000);
function countdown() {

    if (timeLeft == -1) {
        clearTimeout(timerId);
    } else {
        timer.innerHTML = timeLeft;
        timeLeft--;
    }
}

document.ready(function () {
    countdown()
});

