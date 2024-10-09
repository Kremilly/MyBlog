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

    let shortVideoLink = (videoId, timestamp = 0) => {
        if (timestamp == 0) {
            return `https://youtu.be/${ videoId }`;
        }

        return `https://youtu.be/${ videoId }?t=${ timestamp }`;
    };

    let adjustInputWidth = (input) => {
        const measureSpan = document.createElement('span');
        measureSpan.style.visibility = 'hidden';
        measureSpan.style.position = 'absolute';
        measureSpan.style.whiteSpace = 'nowrap';

        measureSpan.textContent = input.value;
        document.body.appendChild(measureSpan);

        measureSpan.style.fontSize = getComputedStyle(input).fontSize;
        measureSpan.style.fontWeight = getComputedStyle(input).fontWeight;
        measureSpan.style.fontFamily = getComputedStyle(input).fontFamily;

        input.style.width = `${measureSpan.offsetWidth + 16}px`;
        document.body.removeChild(measureSpan);
    };

    let titleChaptersToggle = el => {
        $($(el).attr('data-summary-id') + ' > .body').slideToggle(250);
        $($(el).attr('data-summary-id') + ' > .title').toggleClass('title-active');
    };

    let onYouTubeChaptersAPIReady = async () => {
        for (let element of document.querySelectorAll("[id^='summary-']")) {
            let summaryId = `#${element.id}`;
            let inputId = `${summaryId.replace('#', '')}-time`;

            let videoId = element.getAttribute('data-video');
            let playerId = element.id.replace('summary', 'player');
    
            try {
                let response = await fetch(`https://kremilly.com/api/plugins/ytc?v=${videoId}`);
                let callback = await response.json();
                let shortVideoUrl = shortVideoLink(videoId);

                $(summaryId).empty();
    
                if (callback.summary && callback.summary.length > 0) {
                    $(summaryId).append(`
                        <div class='title' data-summary-id='${ summaryId }' onclick='YTC.titleChaptersToggle(this);'>Capítulos</div>

                        <div class='controls'>
                            <input type='text' id='${ inputId }' value='${ shortVideoUrl }' readonly>
                        </div>
    
                        <div class='body'></div>
                    `);

                    let input = document.getElementById(inputId);
                    adjustInputWidth(input);

                    callback.summary.forEach( chapter => {
                        $(summaryId + ' > .body').append(`
                            <div class="chapter" data-time="${ 
                                chapter.start_time_seconds.replace('s', '') 
                            }" data-link-start="${
                                shortVideoLink(videoId, chapter.start_time_seconds)
                            }" data-link-input='${
                                inputId
                            }' data-player="${
                                playerId
                            }">
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
                let input = this.getAttribute('data-link-input');
                let input_start_link = this.getAttribute('data-link-start');

                $(`#${ input }`).val(input_start_link);
                
                let inputElement = document.getElementById(input);
                adjustInputWidth(inputElement);

                player.seekTo(time);
                player.playVideo();
            });
        });
    };

    return {
        init: _ => { return init(); },
        titleChaptersToggle: el => { return titleChaptersToggle(el) },
    };

})();
