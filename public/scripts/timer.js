(function () {
    function getQuery(queryString) {
        const query = location.search.substring(1, location.search.length);
        const queryParams = query.split("&");
        let queryValue;

        for (let i = 0; i < queryParams.length; i++) {
            const paramName = queryParams[i].substring(0, queryParams[i].indexOf('='));

            if (paramName === queryString) {
                queryValue = queryParams[i].substring(queryParams[i].indexOf('=') + 1, queryParams[i].length);
            };
        };

        if (queryValue) {
            return queryValue;
        };
    };

    let workTime = getQuery('work');
    let breakTime = getQuery('break');
    let sessionsQuantity = parseInt(getQuery('sessions'));
    let currentMinutes = workTime;
    let currentSeconds = 0;
    let completedSessions = 0;
    let countdownTimer;

    const timerElement = document.querySelector('.current-time');
    const timerType = document.querySelector('.timer-type');
    const playButton = document.querySelector('.play-button');
    const iconButton = playButton.querySelector('i');
    const circleIcons = document.querySelectorAll('.circle');
    const menuButton = document.querySelector('.menu-button');

    menuButton.addEventListener('click', returnToHomePage);

    function returnToHomePage() {
        window.location = '/';
    };

    circleIcons[0].style.color = '#219653';
    displayTimer(formatTime(currentMinutes, currentSeconds), timerElement);

    playButton.addEventListener('click', function () {

        if (iconButton.classList.contains('fa-play')) {
            startTimer(currentMinutes, currentSeconds);
            toggleClass(iconButton, 'fa-play', 'fa-pause');
        } else {
            clearInterval(countdownTimer);
            toggleClass(iconButton, 'fa-pause', 'fa-play');
        };
    });

    function startTimer(minutes, seconds) {
        countdownTimer = setInterval(() => {
            if (currentMinutes === 0 && currentSeconds === 0) {
                clearInterval(countdownTimer);

                let currentType = timerType.classList.contains('work') ? 'pause' : 'work';
                let oldType = currentType === 'work' ? 'pause' : 'work';

                toggleClass(timerType, oldType, currentType);
                toggleClass(iconButton, 'fa-pause', 'fa-play');

                currentMinutes = timerType.classList.contains('work') ? workTime : breakTime;
                currentSeconds = 0;

                displayTimer(formatTime(currentMinutes, currentSeconds), timerElement);
                adjustStyleType();

                completedSessions++;

                // completedSessions === 2 equivale a 1 sessão
                if ((completedSessions / 2) === sessionsQuantity && currentType === 'work') {
                    let main = document.body.querySelector('main');
                    let header = document.querySelector('header');
                    let div = document.createElement('div');
                    let button = document.createElement('button');
                    let timerContainer = document.querySelector('.timer-container');
                    let divCurrentType = document.querySelector('.current-type');

                    div.classList.add('end-alert');
                    div.innerText = `Todas as ${sessionsQuantity} sessões foram concluídas, parabéns! Retorne à página inicial caso deseje configurar novas sessões.`;
                    button.innerText = 'Início';
                    button.classList.add('default');
                    button.addEventListener('click', returnToHomePage);

                    div.appendChild(button);

                    header.classList.add('outshine');
                    timerContainer.remove();
                    divCurrentType.remove();

                    return main.appendChild(div);
                };

                return timerType.innerText = timerType.classList.contains('work') ? 'Trabalho' : 'Pausa';
            } else if (seconds === 0) {
                seconds = 60;

                minutes--;
            };
            seconds--;

            currentMinutes = minutes;
            currentSeconds = seconds;

            displayTimer(formatTime(currentMinutes, currentSeconds), timerElement);
        }, 1000);
    };

    function formatTime(minutes, seconds) {
        return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    };

    function displayTimer(formattedTime, htmlElement) {
        return htmlElement.innerText = formattedTime;
    };

    function toggleClass(element, oldClass, newClass) {
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    };

    function adjustStyleType() {
        if (timerType.classList.contains('work')) {
            circleIcons[0].style.color = '#219653';
            circleIcons[1].style.color = '#5b6289';
        } else {
            circleIcons[0].style.color = '#f2c94c';
            circleIcons[1].style.color = '#f2c94c';
        };
    };

})();