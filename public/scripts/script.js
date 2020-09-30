(function () {
    const workTime = document.querySelector('#work');
    const breakTime = document.querySelector('#break');
    const quantityOfSessions = document.querySelector('#sessions');
    const continueButton = document.querySelector('button');

    continueButton.addEventListener('click', startWork);

    function startWork() {
        let workValue = validatingValue(getInputValue(workTime.querySelector('input')));
        let breakValue = validatingValue(getInputValue(breakTime.querySelector('input')));
        let sessionsValue = validatingValue(getInputValue(quantityOfSessions.querySelector('input')));

        function getInputValue(input) {
            return parseInt(input.value);
        };

        window.location = `/public/views/timer.html?work=${workValue}&break=${breakValue}&sessions=${sessionsValue}`;
    };

    function validatingValue(value) {
        if (value < 1) {
            value = 1;
        }
        else if (value > 60) {
            value = 60;
        };

        return value;
    };

    function addQuantityAdjustmentEvent(element) {
        const adjustmentArrows = element.querySelectorAll('i');

        adjustmentArrows.forEach(element => {
            element.addEventListener('click', function (e) {
                let classes = e.target.classList;
                classes.contains('up') ? adjustQuantity(e, 'up') : adjustQuantity(e, 'down');
            });
        });
    };

    addQuantityAdjustmentEvent(workTime);
    addQuantityAdjustmentEvent(breakTime);
    addQuantityAdjustmentEvent(quantityOfSessions);

    function adjustQuantity(e, action) {
        const showQuantityELement = e.target.parentElement.parentElement.querySelector('input');
        let currentValue = parseInt(showQuantityELement.value);

        if (action === 'up') {
            currentValue++;
            currentValue = validatingValue(currentValue);

            showQuantityELement.value = currentValue;
        } else {
            currentValue--;
            currentValue = validatingValue(currentValue);

            showQuantityELement.value = currentValue;
        };
    };
})();