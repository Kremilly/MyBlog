const Crates = ( _ => {

    let cratesPage = 'https://crates.io/crates/';
    let cratesURI = 'https://crates.io/api/v1/crates?user_id=232087';
    let crateURI = 'https://crates.io/api/v1/crates/';

    let featured = _ => {
        if (window.location.pathname == '/') {
            fetch(cratesURI).then(
                json => json.json()
            ).then(response => {
                window.location.hash = 'crates';

                $('.featured-tabs').removeClass('actived');
                $('#tabCrates').toggleClass('actived');

                $('#featuredList').empty();

                response.crates.forEach( item => {
                    $('#featuredList').append(`
                        <a href='${cratesPage}${item.name}' target='_blank' class='item featured-item'>
                            <div class='name'>${ Utils.capitalize(item.name) }</div>
                            <div class='info'>${item.description}</div>

                            <div class='footer'>
                                <div class='lang'>${'v.' + item.newest_version}</div>
                                <div class='stats'>${ Utils.format(item.downloads) + ' downloads' }</div>
                            </div>
                        </a>
                    `);
                });

                $('#featured').show();
            });
        }
    };

    let projects = _ => {
        fetch(cratesURI).then(
            json => json.json()
        ).then(response => {
            $('#cratesProjectsListBtn').addClass('actived');

            $('#apisProjectsListBtn').removeClass('actived');
            $('#pinnedProjectsListBtn').removeClass('actived');
            $('#featuredProjectsListBtn').removeClass('actived');

            $('#projectsList').empty();

            response.crates.forEach(item => {
                $('#projectsList').append(`
                    <a href='https://crates.io/crates/${item.name}' target='_blank' class='item project-item'>
                        ${ Utils.capitalize(item.name) }
                        <div class='description'>${ item.description }</div>
                    </a>
                `);
            });
        });
    };

    let countDownloads = _ => {
        if ($('.install').length) {
            $('.alert-install-count').each( function () {
                let $this = $(this);
                let pkgName = $this.data('pkg');
                let pkgType = $this.data('pkg-type');

                if (pkgType == 'cargo') {
                    fetch(crateURI + pkgName).then(
                        json => json.json()
                    ).then( response => {
                        let totalDownloads = Utils.format(response.crate.downloads);
                        
                        $(this).html(`
                            <div class='fas fa-download icon'></div>
                            ${totalDownloads}    
                        `);
                    });
                }
            });
        }
    };

    return {
        cratesURI: cratesURI,
        cratesPage: cratesPage,

        featured: () => { return featured() },
        projects: () => { return projects() },
        countDownloads: () => { return countDownloads() },
    };

})();
