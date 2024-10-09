const YTC = ( _ => {   
    
    let players = {}, hasVideo = false;

    let init = _ => {
        if ($('.youtube').length > 0) {
            let tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

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
                width: '808',
                height: '404',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        });
    };

    let onYouTubeChaptersAPIReady = async () => {
        let elements = document.querySelectorAll("[id^='summary-']");
    
        for (let element of elements) {
            let summaryId = `#${element.id}`;
            let videoId = element.getAttribute('data-video');
            let playerId = element.id.replace('summary', 'player');
    
            try {
                let response = await fetch(`https://kremilly.com/api/plugins/ytc?v=${videoId}`);
                let callback = await response.json();
    
                let summaryElement = document.querySelector(summaryId);
                $(summaryId).empty();
    
                if (callback.summary && callback.summary.length > 0) {
                    callback.summary.forEach( chapter => {
                        $(summaryId).append(`
                            <div class="chapter" data-time="${ chapter.start_time_seconds.replace('s', '') }" data-player="${playerId}">
                                <div class="left">${ chapter.title }</div>
                                <div class="right">${ chapter.start_time }</div>
                            </div>
                        `);
                    });
    
                    $(summaryId).show();
                } else {
                    $(summaryId).hide();
                }
            } catch (error) {
                console.error('Error fetching chapter data:', error);
            }
        }
    };    

    let onPlayerReady = event => {
        let player = event.target;
        let playerId = player.getIframe().id;
    
        document.querySelectorAll(`.chapter[data-player="${playerId}"]`).forEach( function(chapter) {
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