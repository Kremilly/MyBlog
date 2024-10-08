const YTC = ( _ => {   
    
    let players = {}, hasVideo = false;

    const init = _ => {
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
            var videoId = element.getAttribute('data-video');
            var playerId = element.id;
    
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
        var elements = document.querySelectorAll("[id^='summary-']");
        
        elements.forEach( function(element) {
            var summaryId = '#' + element.id;
            var videoId = element.getAttribute('data-video');

            fetch(`https://kremilly.com/api/plugins/ytc?v=${ videoId }`).then(
                json => json.json()
            ).then( callback => {
                $(summaryId).empty();

                if (callback.summary != false) {
                    callback.summary.forEach( chapter => {
                        $(summaryId).append(`
                            <div class='chapter'>
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
        var player = event.target;
        var seekToButton = document.getElementById('seekTo64');

        if (seekToButton) {
            seekToButton.addEventListener('click', function(e) {
                e.preventDefault();
                player.seekTo(64);
                player.playVideo();
            });
        }
    };

    return {
        init: _ => { return init() },
        hasVideo: _ => { return hasVideo },
        onYouTubeChaptersAPIReady: _ => { return onYouTubeChaptersAPIReady() }
    };

})();