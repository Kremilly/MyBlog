const Embed = ( e => {

    let youtube = e => {
        let regex = /&lt;iframe(?:.*?)&gt;/;

        let paragrafos = document.getElementsByTagName('p');

        for (let i = 0; i < paragrafos.length; i++) {
            let paragrafo = paragrafos[i];
            let content = paragrafo.innerHTML;

            if (regex.test(content)) {
                let videoId = content.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                
                if (videoId) {
                    let regex = /width="(\d+)"\s*height="(\d+)"/;
                    let match = content.match(regex);

                    let embedCode = '<iframe width="' + match[1] + '" height="' + match[2] + '" src="https://www.youtube.com/embed/' + videoId[1] + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                    
                    paragrafo.innerHTML = embedCode;
                }
            }
        }
    }

    youtube();

})();