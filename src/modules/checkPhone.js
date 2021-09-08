import checkName from "./checkName";



const checkPhone = formPho => {
    let formPhone = document.querySelector(formPho);
    formPhone.addEventListener('blur', () => {
        function validate(form) {
            const reg = /^\+?\d[\d\(\)\ -]{4,14}\d$/;
            if (reg.test(form) === false) {
                alert('Введите корректный телефон в формате +79104324039 или 79104324039 или 89104324039');
                formPhone.value = '';
                return false;
            }
        }
        validate(formPhone.value);
    });
};

export default checkPhone;
