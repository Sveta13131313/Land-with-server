const form1Email = document.querySelector('#form1-email'),
    form2Email = document.querySelector('#form2-email'),
    form3Email = document.querySelector('#form3-email');

const checkEmail = formEma => {
    let formEmail = document.querySelector(formEma);
    formEmail.addEventListener('blur', () => {

        function validate(form) {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(form) === false) {
                alert('Введите корректный e-mail');
                formEmail.value = '';
                return false;
            }
        }
        validate(formEmail.value);
    });
};

export default checkEmail;