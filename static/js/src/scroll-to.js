const ScrollTo = ( e => {

    let top = e => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    let checkScroll = e => {
        let scrollToTopBtn = document.getElementById('scrollToTopBtn');
        
        if (window.scrollY > 0) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    return {
        top: top,
        checkScroll: checkScroll
    };

})();
