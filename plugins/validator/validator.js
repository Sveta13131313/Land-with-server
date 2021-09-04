'use strict';

class Validator {
    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        //коллекция элементов в которых ошибики
        this.error = new Set();

    }
    //Инициализация
    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
            if (this.error.size) {
                e.preventDefault();
                return false;
            }
        });
    }


    // Если проверка прошла
    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }

        }
        else {
            console.warn('Необходимо передать id полей ввода');
        }
        return true;
    }


    checkIt(event) {
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);  
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    //Если встретилась ошибка ввода
    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }
    //Если проверка прошла успешно
    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    //добавленией стилей элементам
    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success{
            border:2px solid green;
        }
        input.error{
            border:2px solid red;
        }
        .validator-error{
            font-size:12px;
            font-family:sans-serif;
            color:red;
        }
        `;
        document.head.appendChild(style);
    }

    //Патерны
    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.mail) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        if (!this.pattern.text) {
            this.pattern.text = /^\W\$/;
        }
    }
}