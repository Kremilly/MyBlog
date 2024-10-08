const YTC = ( _ => {   
    
    let players = {}, hasVideo = false;

    let init = _ => {
        if ($('.youtube').length > 0) {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";

            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            onYouTubeChaptersAPIReady();
        }
    };

    let onYouTubeIframeAPIReady = _ => {
        var elements = document.querySelectorAll("[id^='player-']");
        
        elements.forEach( function (element) {
            let videoId = element.getAttribute('data-video');
            let playerId = element.id;
    
            players[playerId] = new YT.Player(playerId, {
                height: '390',
                width: '640',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        });
    };

    let onYouTubeChaptersAPIReady = _ => {
        let elements = document.querySelectorAll("[id^='summary-']");
        
        elements.forEach( function(element) {
            let summaryId = '#' + element.id;
            let videoId = element.getAttribute('data-video');

            fetch(`https://kremilly.com/api/plugins/ytc?v=${ videoId }`).then(
                json => json.json()
            ).then( callback => {
                $(summaryId).empty();

                if (callback.summary != false) {
                    callback.summary.forEach( chapter => {
                        $(summaryId).append(`
                            <div class='chapter' data-time='${ chapter.start_time_seconds.replace('s', '') }'>
                                <div class='left'>${ chapter.title }</div>
                                <div class='right'>${ chapter.start_time }</div>
                            </div>
                        `);
                    });

                    $(summaryId).show();
                } else {
                    $(summaryId).hide();
                }
            });
        });
    };

    let onPlayerReady = event => {
        let player = event.target;
    
        document.querySelectorAll('.chapter').forEach( function(chapter) {
            chapter.addEventListener('click', function () {
                let time = this.getAttribute('data-time');
    
                player.seekTo(time);
                player.playVideo();
            });
        });
    };

    return {
        init: _ => { return init() },
    };

})();