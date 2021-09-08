const sendForm = (id) => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка',
        succesMessage = 'Спасибо! Мы скоро с вами свяжемся!';
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
                setTimeout(function () {
                    statusMessage.style.display = 'none';
                }, 3000);
                setTimeout(function () {
                    popup.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
                setTimeout(function () {
                    statusMessage.style.display = 'none';
                }, 3000);
                setTimeout(function () {
                    popup.style.display = 'none';
                }, 5000);
            });

        event.target.reset();
    });

    //Функция запроса на сервер
    const postData = async (formData) => {

        return await fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    };
};

export default sendForm;