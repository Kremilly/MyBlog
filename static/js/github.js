const GitHub = ( _ => {
    
    let username = 'kremilly';
    let apiUri = 'https://api.kremilly.com';

    let projects = _ => {
        fetch(`${Apis.apiUri}/github?user=${ Apis.username }`).then(
            json => json.json()
        ).then(response => {
            $('#pinnedProjectsListBtn').addClass('actived');

            $('#apisProjectsListBtn').removeClass('actived');
            $('#cratesProjectsListBtn').removeClass('actived');
            $('#featuredProjectsListBtn').removeClass('actived');

            $('#projectsList').empty();

            response.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.url}' target='_blank' class='item project-item'>
                        ${item.name}
                    </a>
                `);
            });
        });
    };

    let featured = (no_anchor = false) => {
        if (window.location.pathname == '/') {
            fetch(`${apiUri}/github?user=${username}`, {
                method: 'GET',
                cache: 'default',
            }).then(
                json => json.json()
            ).then(response => {
                if (!no_anchor) window.location.hash = 'pins';

                $('.featured-tabs').removeClass('actived');
                $('#tabPins').toggleClass('actived');

                $('#featuredList').empty();

                response.forEach(item => {
                    $('#featuredList').append(`
                        <a href='${item.url}' target='_blank' class='item featured-item'>
                            <div class='name'>${item.name}</div>
                            <div class='info'>${item.description}</div>

                            <div class='footer'>
                                <div class='lang ${ item.languages[0].toLowerCase() }' data-lang='${item.languages[0]}'>
                                    ${item.languages[0]}
                                </div>

                                <div class='stats'>
                                    <div class='fas fa-star'></div>${ Utils.format(item.stars) + ' stars' } 
                                    <div class='fas fa-code-fork'></div> ${ Utils.format(item.forks) + ' forks' }
                                </div>
                            </div>
                        </a>
                    `);
                });

                $('#featured').show();
            });
        }
    };

    return {
        username: username,
        projects: () => { return projects() },
        featured: () => { return featured() },
    };

})();
