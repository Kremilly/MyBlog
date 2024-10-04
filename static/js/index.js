$( _ => {

    Wikipedia.get();
    ScrollTo.checkScroll();
    Crates.countDownloads();

    Error404.posts();

    let hideMenuTimeout;
    let pathParts = window.location.pathname.split('/');

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

    if (pathParts.length > 0) {
        switch (pathParts[1]) {
            case '':
            case 'blog':
                $('#blog-tab-menu').addClass('actived');
                break;

            case 'docs':
                $('#docs-tab-menu').addClass('actived');
                break;

            case 'links':
                $('#links-tab-menu').addClass('actived');
                break;

            case 'projects':
                $('#projects-tab-menu').addClass('actived');
                break;

            default:
                break;
        }
    }

    $(window).on('scroll', ScrollTo.checkScroll);
    $('#scrollToTopBtn').on('click', ScrollTo.top);

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
        let encodedSearchText = encodeURIComponent(searchText).replace(/%20/g, "+");
        history.replaceState(null, '', `?q=${encodedSearchText}`);

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

    $('#searchItemError404').on('input', function () {
        let searchText = $(this).val().toLowerCase();
        
        $('#itemsContentError > li > a').each( function () {
            let listItemText = $(this).text().toLowerCase();

            if (listItemText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#docsTabError404').on('click', Error404.docs);
    $('#blogTabError404').on('click', Error404.posts);

});
