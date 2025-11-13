const Crates = ( _ => {

    let cratesPage = 'https://crates.io/crates/';
    let cratesURI = 'https://crates.io/api/v1/crates?user_id=232087';
    let crateURI = 'https://crates.io/api/v1/crates/';

    let projects_page = _ => {
        fetch(cratesURI).then(
            json => json.json()
        ).then(response => {
            $('#cratesListPage').empty();

            response.crates.forEach(item => {
                $('#cratesListPage').append(`
                    <a href='https://crates.io/crates/${item.name}' target='_blank' class='project'>
                        <h2>${ Utils.capitalize(item.name) }</h2>
                        <p>${ item.description }</p>
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

        projects_page: () => { return projects_page() },
        countDownloads: () => { return countDownloads() },
    };

})();
