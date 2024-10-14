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

    let titleChaptersToggle = el => {
        $($(el).attr('data-summary-id') + ' > .title').toggleClass('title-active');
        $($(el).attr('data-summary-id') + ' > .body').slideToggle(250);

        $($(el).attr('data-summary-id') + ' > .controls > input').fadeToggle(250);
    };

    let searchChapters = el => {
        let searchText = $(el).val().toLowerCase();
        let summaryId = $(el).closest('[id^="summary-"]').attr('id').replace('-search', '');
    
        $(`#${summaryId} > .body > .chapter`).each(function () {
            let chapterText = $(this).find('.left').text().toLowerCase(); 
            
            if (chapterText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };
    
    let onYouTubeChaptersAPIReady = async _ => {
        let elements = document.querySelectorAll("[id^='summary-']");
        
        for (let element of elements) {
            let summaryId = `#${element.id}`;
            let inputId = `${element.id}-search`; 
            let videoId = element.getAttribute('data-video');
            let playerId = element.id.replace('summary', 'player');
        
            try {
                let response = await fetch(`https://kremilly.com/api/plugins/ytc?v=${videoId}`);
                let callback = await response.json();
    
                currentChapterIndex[playerId] = 0;
                $(summaryId).empty();
        
                if (callback.summary && callback.summary.length > 0) {
                    $(summaryId).append(`
                        <div class='title' data-summary-id='${ summaryId }' onclick='YTC.titleChaptersToggle(this);'>Capítulos</div>
    
                        <div class='controls'>
                            <input type='search' id="${inputId}" placeholder='Buscar capítulos' oninput='YTC.searchChapters(this);'>
                            <div class='chapter-label'></div>
                        </div>
    
                        <div class='body'></div>
                    `);
    
                    let input = document.getElementById(inputId);
    
                    if (!chapterTimestamps[playerId]) {
                        chapterTimestamps[playerId] = [];
                    }
    
                    callback.summary.forEach((chapter, index) => {
                        let timestamp = chapter.start_time_seconds.replace('s', '');
    
                        $(summaryId + ' > .body').append(`
                            <div class="chapter" data-time="${ timestamp }" data-player="${ playerId }" data-index="${ index }">
                                <div class="left">${ limitTextSize(chapter.title, 92) }</div>
                                <div class="right">${ chapter.start_time }</div>
                            </div>
                        `);
    
                        chapterTimestamps[playerId].push(
                            parseInt(chapter.start_time_seconds.replace('s', ''))
                        );
                    });
    
                    chapterTitle(playerId, true); 
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
                currentChapterIndex[playerId] = parseInt(
                    this.getAttribute('data-index')
                );

                goToTimestamp(playerId, player);
            });
        });
    };

    let limitTextSize = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    };

    let chapterTitle = (playerId, indexZero = false) =>  {
        let chapterElement;

        if (indexZero != true) {
            chapterElement = document.querySelector(`
                .chapter[data-player="${
                    playerId
                }"][data-index="${
                    currentChapterIndex[playerId]
                }"]
            `);
        } else {
            chapterElement = document.querySelector(`
                .chapter[data-player="${
                    playerId
                }"][data-index="0"]
            `);
        }

        if (chapterElement) {
            $('#' + playerId.replace('player', 'summary') + ' > .controls > .chapter-label').text(
                limitTextSize(
                    chapterElement.querySelector('.left').textContent, 48
                )
            );
        }
    };

    let goToTimestamp = (playerId, player) => {
        let timestamp = chapterTimestamps[playerId][
            currentChapterIndex[playerId]
        ];

        chapterTitle(playerId);       

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
        searchChapters: el => { return searchChapters(el) },
        titleChaptersToggle: el => { return titleChaptersToggle(el) },
    };

})();
