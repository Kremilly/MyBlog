const Error404 = ( _ => {

    let docsUri = window.location.href.replace(window.location.href, '') + '/api/docs';
    let postsUri = window.location.href.replace(window.location.href, '') + '/api/posts';

    let posts = _ => {
        if ($('#blogTabError404').is(':visible')) {
            fetch(postsUri).then(
                json => json.json()
            ).then(response => {
                $('#blogTabError404').addClass('actived');

                $('#docsTabError404').removeClass('actived');
                $('#linksTabError404').removeClass('actived');

                $('#itemsContentError').empty();

                response.forEach(item => {
                    $('#itemsContentError').append(`
                        <li>
                            <a href='${item.url}'>${ item.title }</a>
                        </li>
                    `);
                });
            });
        }
    };

    let docs = _ => {
        if ($('#docsTabError404').is(':visible')) {
            fetch(docsUri).then(
                json => json.json()
            ).then(response => {
                $('#docsTabError404').addClass('actived');

                $('#blogTabError404').removeClass('actived');
                $('#linksTabError404').removeClass('actived');

                $('#itemsContentError').empty();

                response.forEach(item => {
                    $('#itemsContentError').append(`
                        <li>
                            <a href='${item.url}'>${ item.title }</a>
                        </li>
                    `);
                });
            });
        }
    };

    return {
        docs: () => { return docs() },
        posts: () => { return posts() },
    };

})();
