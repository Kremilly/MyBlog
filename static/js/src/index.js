$( e => {

    lazyload();
    Apis.pinned();

    $('#searchToggleBtn').on('click', function () {
        $(this).toggleClass('actived');
        
        $('#searchInput').fadeToggle(250);
        $('input#searchInput').focus();
    });

    $(window).on('scroll', ScrollTo.checkScroll);

    $('#scrollToTopBtn').on('click', ScrollTo.top);

})