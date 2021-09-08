const checkName = formNam => {
    let formName = document.querySelector(formNam);
    formName.addEventListener('input', () => {
        formName.value = formName.value.replace(/[^А-яЁа-яё\s-]/g, '');
    });
    formName.addEventListener('blur', () => {
        if (formName.value.length < 2) {
            alert('Введите имя - минимум 2 символа');
        }
    });
};

export default checkName;