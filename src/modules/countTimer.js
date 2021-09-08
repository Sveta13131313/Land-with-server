
function countTimer(deadline) {
    const timerHour = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimerRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timerRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timerRemaining % 60),
            minutes = Math.floor((timerRemaining / 60) % 60),
            hours = Math.floor(timerRemaining / 60 / 60);
        return { timerRemaining, hours, minutes, seconds };
    }

    function upDateClock() {
        const timer = getTimerRemaining();
        if (timer.hours < 10) {
            timer.hours = '0' + timer.hours;
        }
        if (timer.minutes < 10) {
            timer.minutes = '0' + timer.minutes;
        }
        if (timer.seconds < 10) {
            timer.seconds = '0' + timer.seconds;
        }
        timerHour.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if (timer.timerRemaining > 0) {
            setInterval(upDateClock, 1000);
        }
        if (timer.timerRemaining <= 0) {
            timerHour.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }
    upDateClock();
}

export default countTimer;

