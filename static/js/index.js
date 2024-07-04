$( _ => {

    ScrollTo.checkScroll();

    var hideMenuTimeout;

    $(window).on('scroll', ScrollTo.checkScroll);
    $('#scrollToTopBtn').on('click', ScrollTo.top);

    $('#toggleMenuBox, #menuBox').hover( function () {
        clearTimeout(hideMenuTimeout);

        $('#menuBoxToggleDocs').hide();
        $('#menuBoxTogglePages').show();
        
        $('#menuBoxTogglePagesBtn').addClass('actived');
        $('#menuBoxToggleDocsBtn').removeClass('actived');

        $('#toggleMenuBox').addClass('actived-menu');
        $('#menuBox').stop(true, true).fadeIn(250);
    }, function () {
        hideMenuTimeout = setTimeout(function() {
            $('#toggleMenuBox').removeClass('actived-menu');
            $('#menuBox').stop(true, true).fadeOut(250);
        }, 300);
    });

    $('#projectsBoxBtn, #projectsBox').hover( function () {
        clearTimeout(hideMenuTimeout);
        $('#projectsBoxBtn').addClass('actived-logo');
        $('#projectsBox').stop(true, true).fadeIn(250);
    }, function () {
        hideMenuTimeout = setTimeout(function() {
            $('#projectsBoxBtn').removeClass('actived-logo');
            $('#projectsBox').stop(true, true).fadeOut(250);
        }, 300);
    });

    $('#menuBoxTogglePagesBtn').on('click', function () {
        $(this).addClass('actived');
        $('#menuBoxToggleDocsBtn').removeClass('actived');
        
        $('#menuBoxToggleDocs').slideUp(250);
        $('#menuBoxTogglePages').slideDown(250);
    });
    
    $('#menuBoxToggleDocsBtn').on('click', function () {
        $(this).addClass('actived');
        $('#menuBoxTogglePagesBtn').removeClass('actived');
        
        $('#menuBoxTogglePages').slideUp(250);
        $('#menuBoxToggleDocs').slideDown(250);
    });

});
