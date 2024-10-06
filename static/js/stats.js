const Stats = ( _ => {

    let cookieName = 'stats';
    let referer = window.location.pathname.split('/');
    let uri = 'https://kremilly.accounts-3ae.workers.dev/views';

    let add = _ => {
        if (!Utils.getCookie(cookieName) || Utils.getCookie(cookieName) != referer[2]) {
            if (referer[1] === 'blog') {
                let referer = window.location.pathname.split('/');

                fetch(`${ uri }/${ referer[2] }?tipo=${ referer[1] }`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(
                    response => response.json()
                ).then(response => {
                    Utils.setCookie(cookieName, referer[2], 1);
                });
            }
        }
    };

    let get = _ => {
        let referer = window.location.pathname.split('/');

        if (referer[1] === 'blog') {
            fetch(`${ uri }/${ referer[2] }`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => response.json()
            ).then(response => {
                $('#stats-post').html(`
                    <div class='fas fa-chart-simple icon'></div>
                    ${ Utils.format(response.acessos) + ' acessos' }
                `);
            });
        }
    };

    return {
        add: () => { return add() },
        get: () => { return get() },
    };

})();