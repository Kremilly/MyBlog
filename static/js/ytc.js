const YTC = ( _ => {   

    let players = {}, 
        chapterTimestamps = {},
        currentChapterIndex = {};

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
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
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
        $($(el).attr('data-summary-id') + ' > .title').toggleClass('title-active');
        $($(el).attr('data-summary-id') + ' > .body').slideToggle(250);
    };

    let onYouTubeChaptersAPIReady = async () => {
        let elements = document.querySelectorAll("[id^='summary-']");
    
        for (let element of elements) {
            let summaryId = `#${element.id}`;
            let inputId = `${summaryId.replace('#', '')}-time`;

            let videoId = element.getAttribute('data-video');
            let playerId = element.id.replace('summary', 'player');
    
            try {
                let response = await fetch(`https://kremilly.com/api/plugins/ytc?v=${videoId}`);
                let callback = await response.json();
                let shortVideoUrl = shortVideoLink(videoId);

                currentChapterIndex[playerId] = 0;
                $(summaryId).empty();
    
                if (callback.summary && callback.summary.length > 0) {
                    $(summaryId).append(`
                        <div class='title' data-summary-id='${ summaryId }' onclick='YTC.titleChaptersToggle(this);'>Capítulos</div>

                        <div class='controls'>
                            <input type='text' id='${ inputId }' value='${ shortVideoUrl }' readonly>

                            <div id='prev-${playerId}' class='fas fa-backward icon'></div>
                            <div id='next-${playerId}' class='fas fa-forward icon'></div>
                        </div>
    
                        <div class='body'></div>
                    `);

                    let input = document.getElementById(inputId);
                    adjustInputWidth(input);

                    if (!chapterTimestamps[playerId]) {
                        chapterTimestamps[playerId] = [];
                    }

                    callback.summary.forEach( (chapter, index) => {
                        $(summaryId + ' > .body').append(`
                            <div class="chapter" data-time="${ 
                                chapter.start_time_seconds.replace('s', '') 
                            }" data-link-start="${
                                shortVideoLink(videoId, chapter.start_time_seconds)
                            }" data-link-input='${
                                inputId
                            }' data-player="${
                                playerId
                            }"' data-index="${index}">
                                <div class="left">${ chapter.title }</div>
                                <div class="right">${ chapter.start_time }</div>
                            </div>
                        `);

                        chapterTimestamps[playerId].push(
                            parseInt(chapter.start_time_seconds.replace('s', ''))
                        );
                    });

                    setupChapterNavigation(playerId);
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
                currentChapterIndex[playerId] = parseInt(this.getAttribute('data-index'));
                
                setupChapterNavigation(playerId);
                goToTimestamp(playerId, player);
            });
        });
    };

    let setupChapterNavigation = (playerId) => {
        let player = players[playerId];
        let prevButton = document.getElementById(`prev-${playerId}`);
        let nextButton = document.getElementById(`next-${playerId}`);

        const updateButtonState = () => {
            if (currentChapterIndex[playerId] <= 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'inline-block';
            }

            if (currentChapterIndex[playerId] >= chapterTimestamps[playerId].length - 1) {
                nextButton.style.display = 'none';
            } else {
                nextButton.style.display = 'inline-block';
            }
        };

        updateButtonState();

        prevButton.addEventListener('click', () => {
            if (currentChapterIndex[playerId] > 0) {
                currentChapterIndex[playerId]--;

                goToTimestamp(playerId, player);
                updateButtonState(); 
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentChapterIndex[playerId] < chapterTimestamps[playerId].length - 1) {
                currentChapterIndex[playerId]++;

                goToTimestamp(playerId, player);
                updateButtonState();
            }
        });
    };

    let goToTimestamp = (playerId, player) => {
        let timestamp = chapterTimestamps[playerId][
            currentChapterIndex[playerId]
        ];

        if (timestamp !== undefined) {
            player.seekTo(timestamp);
            player.playVideo();
        }
    };

    let onPlayerStateChange = event => {
        let player = event.target;
        let playerId = player.getIframe().id;
        
        if (event.data === YT.PlayerState.ENDED) {
            if (currentChapterIndex[playerId] < chapterTimestamps[playerId].length - 1) {
                currentChapterIndex[playerId]++;

                goToTimestamp(playerId, player);
            }
        }
    };

    return {
        init: _ => { return init(); },
        titleChaptersToggle: el => { return titleChaptersToggle(el) },
    };

})();
