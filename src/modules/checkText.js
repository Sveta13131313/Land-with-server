    const checkText = formTe => {
        let  formText = document.querySelector( formTe);
        formText.addEventListener('blur', () => {
            function validate(form) {
                const reg = /[А-яЁа-яё\0-9\s-@_,.~*'!]$/;
                if (reg.test(form) === false) {
                    alert('Введите корректный текст! Можно использовать кириллицу, пробелы, цифры и знаки препинания');
                    formText.value = '';
                    return false;
                }
            }
            validate(formText.value);
        });
    };

    export default checkText;