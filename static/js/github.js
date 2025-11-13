const GitHub = ( _ => {
    
    let username = 'kremilly';
    let apiUri = 'https://api.kremilly.com';

    let projects = _ => {
        fetch(`${Apis.apiUri}/github?user=${ username }`).then(
            json => json.json()
        ).then(response => {
            $('#pinnedProjectsListBtn').addClass('actived');

            $('#apisProjectsListBtn').removeClass('actived');
            $('#cratesProjectsListBtn').removeClass('actived');
            $('#featuredProjectsListBtn').removeClass('actived');

            $('#projectsList').empty();

            response.forEach(item => {
                let tags = '';
                for (const tag of item.tags) {
                    tags += `<div class="tag ${tag.toLowerCase()}">${tag}</div>`;
                }
                
                $('#projectsList').append(`
                    <a href='${item.url}' target='_blank' class='item project-item'>
                        ${item.name}
                        <div class='description'>${ item.description }</div>
                        ${tags}
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

    let projects_page = _ => {
        fetch(`${apiUri}/github?user=${username}`, {
            method: 'GET',
            cache: 'default',
        }).then(
            json => json.json()
        ).then(response => {
            $('#reposListPage').empty();

            response.forEach(item => {
                let tags = '';
                let langs = '';
                let home = '';
            
                for (const tag of item.tags) {
                    tags += `<div class="tag">${tag}</div>`;
                }

                for (const lang of item.languages) {
                    langs += `<div class="lang ${lang.toLowerCase()}">${lang}</div>`;
                }

                if (item.home) {
                    home = `<a href='${ item.home }' class='button'>Home</a>`;
                }

                $('#reposListPage').append(`
                    <div class="project">
                        <h2>${ item.name }</h2>
                        <div class='stats'>
                            <div class='item'>
                                <div class='fas fa-star icon gold'></div>${ Utils.format(item.stars) + ' stars' }
                            </div>
                            
                            <div class='item'>
                                <div class='fas fa-code-fork icon silver'></div> ${ Utils.format(item.forks) + ' forks' }
                            </div>
                        </div>

                        <div class='langs'>
                            ${ langs }
                        </div>

                        <p>${ item.description }</p>
                        <div class='tags'>
                            ${ tags }
                        </div>

                        <div class='buttons'>
                            <a href='${ item.url }' class='button'>Repository</a>
                            ${ home }
                        </div>
                    </div>
                `);
            });
        });
    };

    return {
        username: username,
        projects: () => { return projects() },
        featured: () => { return featured() },
        projects_page: () => { return projects_page() }
    };

})();
