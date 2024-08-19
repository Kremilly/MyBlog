$( _ => {

    Wikipedia.get();
    ScrollTo.checkScroll();
    Crates.countDownloads();

    let hideMenuTimeout;

    setTimeout( function () {
        let searchParam = new URL(window.location).searchParams.get('q');

        if (searchParam) {
            const inputElement = $('#postsSearch');

            inputElement.val(searchParam);

            inputElement.each( function () {
                const event = new Event('input', {
                    bubbles: true
                });
                
                this.dispatchEvent(event);
            });
        }
    }, 10);

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

    $('#postsSearch').on('input', function () {
        let searchText = $(this).val().toLowerCase();
        history.replaceState(null, '', `?q=${searchText}`);

        if (!searchText) {
            let url = new URL(window.location);
            url.searchParams.delete('q');
            history.replaceState(null, '', url.pathname + url.search);
        }

        $('.posts > .article').each( function () {
            $('.posts > .no-results').remove();
            let listItemText = $(this).text().toLowerCase();

            if (listItemText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
                
                if ($('.posts > .article:visible').length == 0) {
                    $('.posts > .no-results').remove();
                    
                    $('.posts').append(`
                        <div class='no-results'>Nenhuma postagem foi encontrada...</div>
                    `);
                }
            }
        });
    });

});
