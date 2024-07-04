const ScrollTo = ( _ => {

    let top = _ => {
        history.pushState(
            null, 
            null, 
            window.location.href.split('#')[0]
        );

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    let checkScroll = _ => {
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
