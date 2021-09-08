import toggleMenu from "./toggleMenu";

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

export default togglePopUp;