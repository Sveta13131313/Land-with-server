
window.addEventListener('DOMContentLoaded', () => {

    //timer
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
    countTimer('30 august 2021');

    //toggle
    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn') ||
                target.closest('menu>ul>li>a') ||
                target.closest('.menu') ||
                (menu.classList.contains('active-menu') && !target.closest('menu'))) {
                handlerMenu();
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');


        let flyInterval;
        let count = 2;
        const clientWidth = document.documentElement.clientWidth;
        const flyAnimate = function () {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count * 35 < clientWidth / 2 && clientWidth > 768) {
                popupContent.style.left = count * 35 + 'px';
            } else {
                cancelAnimationFrame(flyInterval);
                count = 2;
            }
        };
        let animate = false;
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (!animate) {
                    popup.style.display = 'block';
                    flyInterval = requestAnimationFrame(flyAnimate);
                    animate = true;

                }
                animate = false;
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });

    };
    togglePopUp();


    //Scroll
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (const smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', elem => {
            elem.preventDefault();
            const id = smoothLink.getAttribute('href');
            if (id !== '#' && id !== '#close') {
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            ul = document.querySelector('.portfolio-dots');
        let currentSlide = 0,
            interval;

        //добавление точек на слайдер
        const renderDot = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');
                ul.appendChild(li);
            }
        };
        renderDot();
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);

    };

    slider();

    //смена картинки у команды
    const imgs = document.querySelectorAll('.command__photo');

    imgs.forEach(elem => {
        let src;
        elem.addEventListener('mouseenter', e => {
            src = event.target.src;
            event.target.src = event.target.dataset.img;
        });
        elem.addEventListener('mouseout', e => {
            event.target.src = src;
        });
    });


    //проверка ввода цифр в калькуляторе

    const calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count');
    const checkCalck = calcInput => {
        calcInput.addEventListener('blur', () => {
            calcInput.value = calcInput.value.replace(/[\D]/g, '');
        });
    };

    checkCalck(calcSquare);
    checkCalck(calcDay);
    checkCalck(calcCount);


    //проверка ввода в полях Ваше имя
    const form1Name = document.querySelector('#form1-name'),
        form2Name = document.querySelector('#form2-name'),
        form3Name = document.querySelector('#form3-name');

    const checkName = formName => {
        formName.addEventListener('input', () => {
            formName.value = formName.value.replace(/[^А-яЁа-яё\s-]/g, '');
        });
    };

    checkName(form1Name);
    checkName(form2Name);
    checkName(form3Name);


    //проверка ввода email
    const form1Email = document.querySelector('#form1-email'),
        form2Email = document.querySelector('#form2-email'),
        form3Email = document.querySelector('#form3-email');

    const checkEmail = formEmail => {
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
    checkEmail(form1Email);
    checkEmail(form2Email);
    checkEmail(form3Email);


    //проверка ввода телефона
    const form1Phone = document.querySelector('#form1-phone'),
        form2Phone = document.querySelector('#form2-phone'),
        form3Phone = document.querySelector('#form3-phone');

    const checkPhone = formPhone => {

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

    checkPhone(form1Phone);
    checkPhone(form2Phone);
    checkPhone(form3Phone);

    //проверка ввода сообщения
    const form2Text = document.querySelector('#form2-message');

    const checkText = formText => {
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

    checkText(form2Text);


    //Анимация счетка подсчёта

    const time = 100,
        step = 100;
    const outNum = (num, totValue) => {
        let n = 0,
            t = Math.round(time / (num / step));
        const interval = setInterval(() => {
            n += step;
            if (n === num) {
                clearInterval(interval);
            }
            totValue.textContent = n;
        }, t);

    };

    const calc = (price = 100) => {
        //калькулятор
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            totalValue = document.getElementById('total');

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
                total = price * typeValue * squareValue * countValue * dayValue;
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
    calc(100);

    //send-ajax-form

    const sendForm = (id) => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка',
            succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        //    function imageLoaded(src, alt = '') {
        //        return new Promise(function (resolve) {
        //            const image = document.createElement('img');
        //
        //            image.setAttribute('alt', alt);
        //            image.setAttribute('src', src);
        //
        //            image.addEventListener('load', function () {
        //                resolve(image);
        //            });
        //        });
        //    }
        //
        //    async function runExample() {
        //        const myCat = await imageLoaded('https://placekitten.com/500');
        //       const myDog = await imageLoaded('https://placedog.net/500');
        //        form.appendChild(myCat);
        //        form.appendChild(myDog);
        //    }


        const form = document.getElementById(id);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem';
        statusMessage.style.cssText = 'color:white';
        const popup = document.querySelector('.popup');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);

            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);

            formData.forEach((val, key) => {
                formData[key] = val;
            });

            postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = succesMessage;
                    setTimeout(function(){
                        statusMessage.style.display = 'none';
                    }, 3000);
                    setTimeout(function(){
                        popup.style.display = 'none';
                    }, 5000);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                    setTimeout(function(){
                        statusMessage.style.display = 'none';
                    }, 3000);
                    setTimeout(function(){
                        popup.style.display = 'none';
                    }, 5000);
                });

            event.target.reset();
        });

        //Функция запроса на сервер
        const postData = (formData) => {

            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        };
    };
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});
