const checkCalck = calcInp => {
    let calcInput = document.querySelector(calcInp);
    calcInput.addEventListener('blur', () => {
        calcInput.value = calcInput.value.replace(/[\D]/g, '');
    });
};

export default checkCalck;