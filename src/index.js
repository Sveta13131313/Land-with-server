'use scrict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import checkCalck from './modules/checkCalck';
import checkName from './modules/checkName';
import checkEmail from './modules/checkEmail';
import checkPhone from './modules/checkPhone';
import checkText from './modules/checkText';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import animatePhoto from './modules/animatePhoto';

//timer
countTimer('30 september 2021');

//toggle
toggleMenu();

//popup
togglePopUp();

//Scroll
tabs();

//Слайдер
slider();

//смена картинки у команды
animatePhoto();

//проверка ввода цифр в калькуляторе
checkCalck('.calcSquare');
checkCalck('.calcDay');
checkCalck('.calcCount');

//проверка ввода в полях Ваше имя
checkName('.form1Name');
checkName('.form2Name');
checkName('.form3Name');

//проверка ввода email
checkEmail('.form1Email');
checkEmail('.form2Email');
checkEmail('.form3Email');


//проверка ввода телефона
checkPhone('.form1Phone');
checkPhone('.form2Phone');
checkPhone('.form3Phone');

//проверка ввода сообщения
checkText('.form2Text');

//калькулятор
calc(100);

//send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');