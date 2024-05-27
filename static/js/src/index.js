$( e => {

    lazyload();

    $(window).on('scroll', ScrollTo.checkScroll);

    $('#scrollToTopBtn').on('click', ScrollTo.top);

})