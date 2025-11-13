const GitHub = ( _ => {
    
    let username = 'kremilly';
    let apiUri = 'https://api.kremilly.com';

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
                    langs += `<div class="lang">
                        <div class='lang-color ${lang.toLowerCase()}'></div>
                        ${ lang }
                    </div>`;
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
        projects_page: () => { return projects_page() }
    };

})();
