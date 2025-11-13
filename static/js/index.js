$( _ => {

    Wikipedia.get();
    ScrollTo.checkScroll();
    Crates.countDownloads();

    YTC.init();

    Error404.posts();

    $('#postReadAlsoBox').show();

    if (window.scrollY > 10) {
        $('header').addClass('glass-effect');
        $('#tocBox').addClass('glass-effect');
        $('#toolsBox').addClass('glass-effect');
    } else {
        $('header').removeClass('glass-effect');
        $('#tocBox').removeClass('glass-effect');
        $('#toolsBox').removeClass('glass-effect');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            $('header').addClass('glass-effect');
            $('#tocBox').addClass('glass-effect');
            $('#toolsBox').addClass('glass-effect');
        } else {
            $('header').removeClass('glass-effect');
            $('#tocBox').removeClass('glass-effect');
            $('#toolsBox').removeClass('glass-effect');
        }
    });

    if ($('.container-projects').length > 0) {
        Crates.projects_page();
        GitHub.projects_page();
        Projects.projects_page();

        $('#reposListPage').slideDown(250);
        $('#cratesListPage').slideToggle(250);

        $('#toggleReposListPage').on('click', function () {
            $(this).addClass('actived');
            $('#toggleCratesListPage').removeClass('actived');

            $('#cratesListPage').slideUp(250);
            $('#reposListPage').slideDown(250);
        });

        $('#toggleCratesListPage').on('click', function () {
            $(this).addClass('actived');
            $('#toggleReposListPage').removeClass('actived');
            
            $('#reposListPage').slideUp(250);
            $('#cratesListPage').slideDown(250);
        });
    }

    let hideMenuTimeout;
    let pathParts = window.location.pathname.split('/');

    setTimeout( function () {
        let searchParam = new URL(window.location).searchParams.get('q');

        if (searchParam) {
            let inputElement = $('#postsSearch');
            inputElement.val(searchParam);

            inputElement.each( function () {
                let event = new Event('input', {
                    bubbles: true
                });
                
                this.dispatchEvent(event);
            });
        }
    }, 10);

    let lastPath = window.location.pathname.split('/').filter(Boolean).pop();
    if (lastPath === 'blog' || lastPath === 'links') {
        $('#tocBoxBtn').hide();
    }

    $(window).on('scroll', ScrollTo.checkScroll);
    $('#scrollToTopBtn').on('click', ScrollTo.top);

    $('#menuBoxTogglePagesBtn').on('click', function () {
        $(this).addClass('actived');
        $('#menuBoxToggleDocsBtn').removeClass('actived');
        
        $('#menuBoxToggleDocs').slideUp(250);
        $('#menuBoxTogglePages').slideDown(250);
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

    $('#blogTabError404').on('click', Error404.posts);

});
