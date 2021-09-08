    //Анимация счетка подсчёта
const outNum = (num, totValue) => {
    const time = 100,
        step = 200;
    let n = 0,
        t = Math.round(time / (num / step));
    const interval = setInterval(() => {
        n += step;
        if (n >= num) {
            totValue.textContent = num;
            clearInterval(interval);
        }
        totValue.textContent = n;
    }, t);
};

const calc = (price = 100) => {
    const calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count');

    const calcBlock = document.querySelector('.calc-block'),
        totalValue = document.getElementById('total'),
        calcType = document.querySelector('.calc-type');


    const countSum = () => {
        let total = 0, countValue = 1, dayValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;

        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;

        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;


        }
        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            outNum(total, totalValue);
        }

    };

    calcBlock.addEventListener('change', event => {
        const target = event.target;
        const title = document.querySelector('.calc-option-title'),
            titleDinamik = calcType.options[calcType.selectedIndex];

        if (target.matches('select') && titleDinamik === title) {
            calcSquare.value = '';
            calcCount.value = '';
            calcDay.value = '';
            totalValue.textContent = 0;
        } else if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;