const Addons = ( _ => {

    let downloadPdf = _ => {
        let endpoint = window.location.href.replace(
            '#', ''
        ).replace(
            window.location.hash, ''
        );

        endpoint = endpoint.replace(
            '/docs', '/api/export/docs'
        ).replace(
            '/blog', '/api/export/blog'
        );

        fetch(endpoint).then(response => {
            if (!response.ok) { throw new Error('Network response was not ok') }
            return response.url
        }).then( url => {
            const a = document.createElement('a');

            a.href = url;
            a.download = Utils.getSlug() + '.pdf';
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        }).catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
    };

    let qrCodeDownload = _ => {
        const imageUrl = $('#qrCodePage').attr('src');
        const link = document.createElement('a');

        link.href = imageUrl;
        link.download = `qrcode-${ Utils.getSlug() }.png`;
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    };

    let sourceCode = _ => {
        let endpoint = window.location.href.replace(
            '#', ''
        ).replace(
            window.location.hash, ''
        ) + '/raw';

        if (endpoint.includes('/docs') || endpoint.includes('/blog')) {
            fetch(endpoint).then(text => text.text()).then(content => {
                $('#sourceCodePage').val(content)
            });
        }
    };

    return {
        sourceCode: _ => { return sourceCode() },
        downloadPdf: _ => { return downloadPdf() },
        qrCodeDownload: _ => { return qrCodeDownload() },
    };

})();
