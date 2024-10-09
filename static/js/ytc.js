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
                summaryElement.innerHTML = '';
    
                if (callback.summary && callback.summary.length > 0) {
                    callback.summary.forEach(chapter => {
                        let chapterElement = document.createElement('div');
                        chapterElement.classList.add('chapter');
                        chapterElement.setAttribute('data-time', chapter.start_time_seconds.replace('s', ''));
                        chapterElement.setAttribute('data-player', playerId);
    
                        let leftDiv = document.createElement('div');
                        leftDiv.classList.add('left');
                        leftDiv.textContent = chapter.title;
    
                        let rightDiv = document.createElement('div');
                        rightDiv.classList.add('right');
                        rightDiv.textContent = chapter.start_time;
    
                        chapterElement.appendChild(leftDiv);
                        chapterElement.appendChild(rightDiv);
    
                        summaryElement.appendChild(chapterElement);
                    });
    
                    summaryElement.style.display = 'block';
                } else {
                    summaryElement.style.display = 'none';
                }
            } catch (error) {
                console.error('Error fetching chapter data:', error);
            }
        }
    };    

    let onPlayerReady = event => {
        let player = event.target;
        let playerId = player.getIframe().id;
    
        document.querySelectorAll(`.chapter[data-player="${playerId}"]`).forEach(function(chapter) {
            chapter.addEventListener('click', function() {
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