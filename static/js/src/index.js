$( e => {

    lazyload();

    Apis.checkApi();

    $('#searchToggleBtn').on('click', function () {
        $(this).toggleClass('actived');
        
        $('#searchInput').fadeToggle(250);
        $('input#searchInput').focus();
    });

    $('#tabApis').on('click', Apis.apis);
    $('#tabPins').on('click', Apis.pinned);
    $('#tabCrates').on('click', Apis.crates);

    $(window).on('scroll', ScrollTo.checkScroll);

    $('#scrollToTopBtn').on('click', ScrollTo.top);

})