let $ = jQuery;

const Apis = ( _ => {

    let apiUri = 'https://api.kremilly.com';

    let featured = _ => {
        if (window.location.pathname == '/') {
            fetch(apiUri).then(
                json => json.json()
            ).then(response => {
                window.location.hash = 'apis';

                $('.featured-tabs').removeClass('actived');
                $('#tabApis').toggleClass('actived');

                $('#featuredList').empty();

                response.list.forEach(item => {
                    $('#featuredList').append(`
                        <a href='${item.wiki}' target='_blank' class='item featured-item'>
                            <div class='name'>${ Utils.capitalize(item.name) }</div>
                        </a>
                    `);
                });

                $('#featured').show();
            });
        }
    };

    let projects = _ => {
        fetch(apiUri).then(
            json => json.json()
        ).then( response => {
            $('#apisProjectsListBtn').addClass('actived');

            $('#pinnedProjectsListBtn').removeClass('actived');
            $('#cratesProjectsListBtn').removeClass('actived');
            $('#featuredProjectsListBtn').removeClass('actived');

            $('#projectsList').empty();

            response.list.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.wiki}' target='_blank' class='item project-item'>
                        ${_.capitalize(item.name)}
                    </a>
                `);
            });
        });
    };

    let checkApi = _ => {
        if (window.location.pathname == '/') {
            if (window.location.hash) {
                $('#featured').addClass('featured-caller');
            } else {
                $('#featured').removeClass('featured-caller');
            }

            switch (window.location.hash) {
                case '#apis':
                    this.featured();
                    break;

                case '#pins':
                    GitHub.featured();
                    break;

                case '#crates':
                    Crates.featured();
                    break;

                case '#projects':
                    Projects.featured();
                    break;
                    
                default:
                    GitHub.featured(true);
                    break;
            }
        }
    };

    return {
        apiUri: apiUri,

        featured: () => { return featured() },
        projects: () => { return projects() },
        checkApi: () => { return checkApi() },
    };

})();
