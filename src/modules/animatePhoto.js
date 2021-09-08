const animatePhoto=()=>{
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
    };

    export default animatePhoto;