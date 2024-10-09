const Addons=(_=>{let downloadPdf=_=>{let endpoint=window.location.href.replace('#','').replace(window.location.hash,'')+'/export';fetch(endpoint).then(response=>{if(!response.ok){throw new Error('Network response was not ok')}return response.url}).then(url=>{const a=document.createElement('a');a.href=url;a.download=Utils.getSlug()+'.pdf';document.body.appendChild(a);a.click();document.body.removeChild(a);}).catch(error=>{console.error('There was an error with the fetch operation:',error);});};let qrCodeDownload=_=>{const imageUrl=$('#qrCodePage').attr('src');const link=document.createElement('a');link.href=imageUrl;link.download=`qrcode-${Utils.getSlug()}.png`;document.body.appendChild(link);link.click();document.body.removeChild(link);};let sourceCode=_=>{let endpoint=window.location.href.replace('#','').replace(window.location.hash,'')+'/raw';if(endpoint.includes('/docs')||endpoint.includes('/blog')){fetch(endpoint).then(text=>text.text()).then(content=>{$('#sourceCodePage').val(content)});}};return{sourceCode:_=>{return sourceCode()},downloadPdf:_=>{return downloadPdf()},qrCodeDownload:_=>{return qrCodeDownload()},};})();let $=jQuery;const Apis=(_=>{let apiUri='https://api.kremilly.com';let projects=_=>{fetch(apiUri).then(json=>json.json()).then(response=>{$('#apisProjectsListBtn').addClass('actived');$('#pinnedProjectsListBtn').removeClass('actived');$('#cratesProjectsListBtn').removeClass('actived');$('#featuredProjectsListBtn').removeClass('actived');$('#projectsList').empty();response.list.forEach(item=>{$('#projectsList').append(`<a href='${item.wiki}' target='_blank' class='item project-item'>${Utils.capitalize(item.name)}</a>`);});});};let checkApi=_=>{if(window.location.pathname=='/'){if(window.location.hash){$('#featured').addClass('featured-caller');}else{$('#featured').removeClass('featured-caller');}switch(window.location.hash){case '#apis':featured();break;case '#pins':GitHub.featured();break;case '#crates':Crates.featured();break;case '#projects':Projects.featured();break;default:GitHub.featured(true);break;}}};return{apiUri:apiUri,featured:()=>{return featured()},projects:()=>{return projects()},checkApi:()=>{return checkApi()},};})();const Crates=(_=>{let cratesPage='https://crates.io/crates/';let cratesURI='https://crates.io/api/v1/crates?user_id=232087';let crateURI='https://crates.io/api/v1/crates/';let featured=_=>{if(window.location.pathname=='/'){fetch(cratesURI).then(json=>json.json()).then(response=>{window.location.hash='crates';$('.featured-tabs').removeClass('actived');$('#tabCrates').toggleClass('actived');$('#featuredList').empty();response.crates.forEach(item=>{$('#featuredList').append(`<a href='${cratesPage}${item.name}' target='_blank' class='item featured-item'><div class='name'>${Utils.capitalize(item.name)}</div><div class='info'>${item.description}</div><div class='footer'><div class='lang'>${'v.'+item.newest_version}</div><div class='stats'>${Utils.format(item.downloads)+' downloads'}</div></div></a>`);});$('#featured').show();});}};let projects=_=>{fetch(cratesURI).then(json=>json.json()).then(response=>{$('#cratesProjectsListBtn').addClass('actived');$('#apisProjectsListBtn').removeClass('actived');$('#pinnedProjectsListBtn').removeClass('actived');$('#featuredProjectsListBtn').removeClass('actived');$('#projectsList').empty();response.crates.forEach(item=>{$('#projectsList').append(`<a href='https://crates.io/crates/${item.name}' target='_blank' class='item project-item'>${Utils.capitalize(item.name)}<div class='description'>${item.description}</div></a>`);});});};let countDownloads=_=>{if($('.install').length){$('.alert-install-count').each(function(){let $this=$(this);let pkgName=$this.data('pkg');let pkgType=$this.data('pkg-type');if(pkgType=='cargo'){fetch(crateURI+pkgName).then(json=>json.json()).then(response=>{let totalDownloads=Utils.format(response.crate.downloads);$(this).html(`<div class='fas fa-download icon'></div>${totalDownloads}`);});}});}};return{cratesURI:cratesURI,cratesPage:cratesPage,featured:()=>{return featured()},projects:()=>{return projects()},countDownloads:()=>{return countDownloads()},};})();const Error404=(_=>{let docsUri=window.location.href.replace(window.location.href,'')+'/api/docs';let postsUri=window.location.href.replace(window.location.href,'')+'/api/posts';let posts=_=>{if($('#blogTabError404').is(':visible')){fetch(postsUri).then(json=>json.json()).then(response=>{$('#blogTabError404').addClass('actived');$('#docsTabError404').removeClass('actived');$('#linksTabError404').removeClass('actived');$('#itemsContentError').empty();response.forEach(item=>{$('#itemsContentError').append(`<li><a href='${item.url}'>${item.title}</a></li>`);});});}};let docs=_=>{if($('#docsTabError404').is(':visible')){fetch(docsUri).then(json=>json.json()).then(response=>{$('#docsTabError404').addClass('actived');$('#blogTabError404').removeClass('actived');$('#linksTabError404').removeClass('actived');$('#itemsContentError').empty();response.forEach(item=>{$('#itemsContentError').append(`<li><a href='${item.url}'>${item.title}</a></li>`);});});}};return{docs:()=>{return docs()},posts:()=>{return posts()},};})();$(_=>{Projects.projects();$('#apisProjectsListBtn').on('click',Apis.projects);$('#pinnedProjectsListBtn').on('click',GitHub.projects);$('#cratesProjectsListBtn').on('click',Crates.projects);$('#featuredProjectsListBtn').on('click',Projects.projects);});const GitHub=(_=>{let username='kremilly';let apiUri='https://api.kremilly.com';let projects=_=>{fetch(`${Apis.apiUri}/github?user=${username}`).then(json=>json.json()).then(response=>{$('#pinnedProjectsListBtn').addClass('actived');$('#apisProjectsListBtn').removeClass('actived');$('#cratesProjectsListBtn').removeClass('actived');$('#featuredProjectsListBtn').removeClass('actived');$('#projectsList').empty();response.forEach(item=>{$('#projectsList').append(`<a href='${item.url}' target='_blank' class='item project-item'>${item.name}<div class="lang ${item.languages[0].toLowerCase()}">${item.languages[0]}</div><div class='description'>${item.description}</div></a>`);});});};let featured=(no_anchor=false)=>{if(window.location.pathname=='/'){fetch(`${apiUri}/github?user=${username}`,{method:'GET',cache:'default',}).then(json=>json.json()).then(response=>{if(!no_anchor)window.location.hash='pins';$('.featured-tabs').removeClass('actived');$('#tabPins').toggleClass('actived');$('#featuredList').empty();response.forEach(item=>{$('#featuredList').append(`<a href='${item.url}' target='_blank' class='item featured-item'><div class='name'>${item.name}</div><div class='info'>${item.description}</div><div class='footer'><div class='lang ${item.languages[0].toLowerCase()}' data-lang='${item.languages[0]}'>${item.languages[0]}</div><div class='stats'><div class='fas fa-star'></div>${Utils.format(item.stars)+' stars'}<div class='fas fa-code-fork'></div>${Utils.format(item.forks)+' forks'}</div></div></a>`);});$('#featured').show();});}};return{username:username,projects:()=>{return projects()},featured:()=>{return featured()},};})();$(_=>{Wikipedia.get();ScrollTo.checkScroll();Crates.countDownloads();Stats.add();Stats.get();YTC.init();Error404.posts();let hideMenuTimeout;let pathParts=window.location.pathname.split('/');setTimeout(function(){let searchParam=new URL(window.location).searchParams.get('q');if(searchParam){let inputElement=$('#postsSearch');inputElement.val(searchParam);inputElement.each(function(){let event=new Event('input',{bubbles:true});this.dispatchEvent(event);});}},10);if(pathParts.length>0){switch(pathParts[1]){case '':case 'blog':$('#blog-tab-menu').addClass('actived');break;case 'docs':$('#docs-tab-menu').addClass('actived');break;case 'links':$('#links-tab-menu').addClass('actived');break;case 'projects':$('#projects-tab-menu').addClass('actived');break;default:break;}}$(window).on('scroll',ScrollTo.checkScroll);$('#scrollToTopBtn').on('click',ScrollTo.top);$('#projectsBoxBtn,#projectsBox').hover(function(){clearTimeout(hideMenuTimeout);$('#projectsBoxBtn').addClass('actived-logo');$('#projectsBox').stop(true,true).fadeIn(250);},function(){hideMenuTimeout=setTimeout(function(){$('#projectsBoxBtn').removeClass('actived-logo');$('#projectsBox').stop(true,true).fadeOut(250);},300);});$('#menuBoxTogglePagesBtn').on('click',function(){$(this).addClass('actived');$('#menuBoxToggleDocsBtn').removeClass('actived');$('#menuBoxToggleDocs').slideUp(250);$('#menuBoxTogglePages').slideDown(250);});$('#menuBoxToggleDocsBtn').on('click',function(){$(this).addClass('actived');$('#menuBoxTogglePagesBtn').removeClass('actived');$('#menuBoxTogglePages').slideUp(250);$('#menuBoxToggleDocs').slideDown(250);});$('#postsSearch').on('input',function(){let searchText=$(this).val().toLowerCase();let encodedSearchText=encodeURIComponent(searchText).replace(/%20/g,"+");history.replaceState(null,'',`?q=${encodedSearchText}`);if(!searchText){let url=new URL(window.location);url.searchParams.delete('q');history.replaceState(null,'',url.pathname+url.search);}$('.posts>.article').each(function(){$('.posts>.no-results').remove();let listItemText=$(this).text().toLowerCase();if(listItemText.includes(searchText)){$(this).show();}else{$(this).hide();if($('.posts>.article:visible').length==0){$('.posts>.no-results').remove();$('.posts').append(`<div class='no-results'>Nenhuma postagem foi encontrada...</div>`);}}});});$('#searchItemError404').on('input',function(){let searchText=$(this).val().toLowerCase();$('#itemsContentError>li>a').each(function(){let listItemText=$(this).text().toLowerCase();if(listItemText.includes(searchText)){$(this).show();}else{$(this).hide();}});});$('#docsTabError404').on('click',Error404.docs);$('#blogTabError404').on('click',Error404.posts);});const Mermaid=(_=>{mermaid.initialize({theme:'dark',securityLevel:'loose',});let mermaidCodeBlocks=document.querySelectorAll('.language-mermaid');mermaidCodeBlocks.forEach(block=>{block.classList.remove('language-mermaid');block.classList.add('diagram-mermaid');});mermaidCodeBlocks.forEach(block=>{let diagramDiv=document.createElement('div');diagramDiv.classList.add('mermaid');diagramDiv.textContent=block.textContent;block.textContent='';block.appendChild(diagramDiv);mermaid.init(undefined,diagramDiv);});})();$(_=>{lazyload();$('#postDownloadPdfBtn,#postDownloadPdfBtn2').on('click',Addons.downloadPdf);$('#postShareBtn').on('click',function(){$(this).toggleClass('actived');$('#postShareBox').slideToggle(250);});$('#postFilesBtn').on('click',function(){$(this).toggleClass('actived');$('#postLinksBtn').removeClass('actived');$('#postReadAlsoBtn').removeClass('actived');$('#postLinksBox').hide();$('#postReadAlsoBox').hide();$('#postFilesBox').slideToggle(250);});$('#postReadAlsoBtn').on('click',function(){$(this).toggleClass('actived');$('#postLinksBtn').removeClass('actived');$('#postFilesBtn').removeClass('actived');$('#postLinksBox').hide();$('#postFilesBox').hide();$('#postReadAlsoBox').slideToggle(250);});$('#postLinksBtn').on('click',function(){$(this).toggleClass('actived');$('#postFilesBtn').removeClass('actived');$('#postReadAlsoBtn').removeClass('actived');$('#postFilesBox').hide();$('#postReadAlsoBox').hide();$('#postLinksBox').slideToggle(250);});$('#postShareBoxInput').on('click',function(){$(this).focus();$(this).select();let inputVal=$(this).val();navigator.clipboard.writeText(inputVal);});});const Projects=(_=>{let projectsUri=window.location.href.replace(window.location.href,'')+'/api/projects';let projects=_=>{fetch(projectsUri).then(json=>json.json()).then(response=>{$('#featuredProjectsListBtn').addClass('actived');$('#apisProjectsListBtn').removeClass('actived');$('#pinnedProjectsListBtn').removeClass('actived');$('#cratesProjectsListBtn').removeClass('actived');$('#projectsList').empty();response.forEach(item=>{$('#projectsList').append(`<a href='${item.url}' target='_blank' class='item project-item'>${item.name}<div class='description'>${item.description}</div></a>`);});});};return{projects:()=>{return projects()},};})();const ScrollTo=(_=>{let top=_=>{history.pushState(null,null,window.location.href.split('#')[0]);window.scroll({top:0,left:0,behavior:'smooth'});};let checkScroll=_=>{let scrollToTopBtn=document.getElementById('scrollToTopBtn');if(window.scrollY>0){scrollToTopBtn.style.display='block';}else{scrollToTopBtn.style.display='none';}};return{top:top,checkScroll:checkScroll};})();const Stats=(_=>{let cookieName='stats';let referer=window.location.pathname.split('/');let uri='https://kremilly.accounts-3ae.workers.dev/views';let add=_=>{if(!Utils.getCookie(cookieName)||Utils.getCookie(cookieName)!=referer[2]){if(referer[1]==='blog'){let referer=window.location.pathname.split('/');fetch(`${uri}/${referer[2]}?tipo=${referer[1]}`,{method:'POST',headers:{'Content-Type':'application/json'},}).then(response=>response.json()).then(response=>{Utils.setCookie(cookieName,referer[2],1);});}}};let get=_=>{let referer=window.location.pathname.split('/');if(referer[1]==='blog'){fetch(`${uri}/${referer[2]}`,{method:'GET',headers:{'Content-Type':'application/json'}}).then(response=>response.json()).then(response=>{$('#stats-post').html(`<div class='fas fa-chart-simple icon'></div>${Utils.format(response.acessos)+' acessos'}`);});}};return{add:()=>{return add()},get:()=>{return get()},};})();$(_=>{let paddingTop=60;let timerAnimate=800;let tocList=$('#tocList');let headers=$('h1,h2,h3');let currentHash=window.location.hash;$('#tocBoxBtn').click(function(){$('#pkgBoxBtn').removeClass('actived');$(this).toggleClass('actived');$('#pkgBox').slideUp();$('#tocBox').slideToggle(250);});$('#searchToc').on('input',function(){let searchText=$(this).val().toLowerCase();$('#tocList>a').each(function(){let listItemText=$(this).text().toLowerCase();if(listItemText.includes(searchText)){$(this).show();}else{$(this).hide();}});});headers.each(function(){let header=$(this);if(!header.attr('id')){let sanitizedId=Utils.removeAccents(header.text());header.attr('id',sanitizedId);}let link=$('<a/>').text(header.text()).attr('href','#'+header.attr('id'));tocList.append(link);});if(window.location.pathname!=='/'){tocList.on('click','a',function(){let targetOffset=$($(this).attr('href')).offset().top;$('html,body').animate({scrollTop:targetOffset-paddingTop},timerAnimate);});}if(currentHash&&window.location.pathname!=='/'){$('html,body').animate({scrollTop:$(currentHash).offset().top-paddingTop},timerAnimate);}});$(_=>{Addons.sourceCode();$('#downloadQrCodeBtn').on('click',Addons.qrCodeDownload);$('#toolsBoxBtn').on('click',function(){$(this).toggleClass('actived');$('#tocBoxBtn').removeClass('actived');$('#tocBox').slideUp(250);$('#toolsBox').slideToggle(250);});$('#sourceCodePageBtn').on('click',function(){$('#toolsBoxBtn').click();$('#sourceCodePageModal').fadeIn(250);});$('#sourceCodePageCloseBtn').on('click',function(){$('#sourceCodePageModal').fadeOut(250);});});const Utils=(_=>{let format=number=>{switch(true){case number>=1e9:return Math.floor(number/1e9)+'B';case number>=1e6:return Math.floor(number/1e6)+'M';case number>=1000:return Math.floor(number/1000)+'k';default:return number.toString();}};let setCookie=(name,value,days)=>{const date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));const expires="expires="+date.toUTCString();document.cookie=name+"="+value+";"+expires+";path=/";};let langColor=language=>{fetch(`https://gist.githubusercontent.com/Kremilly/0e2b5ac9779857efcf0e3fd6f62cd093/raw/112c3af99ed5db18776192609215353a18c28e9d/languages-hex-colors.json`,{method:'GET',cache:'default',}).then(response=>response.json()).then(colors=>{document.querySelectorAll(language).forEach(element=>{const lang=element.getAttribute('data-lang').toLowerCase();if(colors.hasOwnProperty(lang)){element.style.color=colors[lang];}});})};let removeAccents=text=>{return text.replace(/\s+/g,'_').replace(/[áàãâä]/gi,'a').replace(/[éèêë]/gi,'e').replace(/[íìîï]/gi,'i').replace(/[óòõôö]/gi,'o').replace(/[úùûü]/gi,'u').replace(/[ç]/gi,'c').replace(/[?!.,;:']/g,'');};let capitalize=text=>{return text.charAt(0).toUpperCase()+text.slice(1).toLowerCase();};let getSlug=_=>{var pathname=window.location.pathname;return slug=pathname.split('/').pop();};let getCookie=name=>{const cookie=document.cookie.match('(^|;)?'+name+'=([^;]*)(;|$)');return cookie?cookie[2]:null;};let copy=element=>{const range=document.createRange();range.selectNodeContents(element);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);navigator.clipboard.writeText(selection.toString());};return{getSlug:_=>{return getSlug()},copy:(element)=>{return copy(element)},format:(number)=>{return format(number)},getCookie:(name)=>{return getCookie(name)},capitalize:(text)=>{return capitalize(text)},langColor:(language)=>{return langColor(language)},removeAccents:(text)=>{return removeAccents(text)},setCookie:(name,value,days)=>{return setCookie(name,value,days)},};})();const Wikipedia=(_=>{let endpoint='https://api.kremilly.com/wikipedia';let get=_=>{if($('.wikipedia').length){$('.wikipedia-page-content').each(function(){let text=$(this).text().replace("\n",'').split('/');fetch(`${endpoint}?location=${text[0]}&term=${text[1]}&short_summary=true`).then(json=>json.json()).then(response=>{$(this).html(response.summary);$(this).attr('href',response.page_url);});});}};return{get:()=>{return get()},};})();const YTC=(_=>{let players={},hasVideo=false;let init=_=>{if($('.youtube').length>0){let tag=document.createElement('script');tag.src="https://www.youtube.com/iframe_api";let firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);window.onYouTubeIframeAPIReady=onYouTubeIframeAPIReady;onYouTubeChaptersAPIReady();}};let onYouTubeIframeAPIReady=_=>{var elements=document.querySelectorAll("[id^='player-']");elements.forEach(function(element){let videoId=element.getAttribute('data-video');let playerId=element.id;players[playerId]=new YT.Player(playerId,{height:'390',width:'640',videoId:videoId,events:{'onReady':onPlayerReady}});});};let onYouTubeChaptersAPIReady=async()=>{let elements=document.querySelectorAll("[id^='summary-']");for(let element of elements){let summaryId=`#${element.id}`;let videoId=element.getAttribute('data-video');let playerId=element.id.replace('summary','player');try{let response=await fetch(`https://kremilly.com/api/plugins/ytc?v=${videoId}`);let callback=await response.json();let summaryElement=document.querySelector(summaryId);summaryElement.innerHTML='';if(callback.summary&&callback.summary.length>0){callback.summary.forEach(chapter=>{let chapterElement=document.createElement('div');chapterElement.classList.add('chapter');chapterElement.setAttribute('data-time',chapter.start_time_seconds.replace('s',''));chapterElement.setAttribute('data-player',playerId);let leftDiv=document.createElement('div');leftDiv.classList.add('left');leftDiv.textContent=chapter.title;let rightDiv=document.createElement('div');rightDiv.classList.add('right');rightDiv.textContent=chapter.start_time;chapterElement.appendChild(leftDiv);chapterElement.appendChild(rightDiv);summaryElement.appendChild(chapterElement);});summaryElement.style.display='block';}else{summaryElement.style.display='none';}}catch(error){console.error('Error fetching chapter data:',error);}}};let onPlayerReady=event=>{let player=event.target;let playerId=player.getIframe().id;document.querySelectorAll(`.chapter[data-player="${playerId}"]`).forEach(function(chapter){chapter.addEventListener('click',function(){let time=this.getAttribute('data-time');player.seekTo(time);player.playVideo();});});};return{init:_=>{return init()},};})();