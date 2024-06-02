var e;const Apis=(t=>{let s="kremilly",a="https://api.kremilly.com",i=window.location.href.replace(window.location.href,"")+"/api/projects",o="https://crates.io/api/v1/crates?user_id=232087",c=t=>t>=1e3?t/1e3+"k":t.toString(),r=t=>{fetch("https://gist.githubusercontent.com/kremilly/0e2b5ac9779857efcf0e3fd6f62cd093/raw/112c3af99ed5db18776192609215353a18c28e9d/languages-hex-colors.json",{method:"GET",cache:"default"}).then(t=>t.json()).then(s=>{_.forEach(s,(s,a)=>{$(t).attr("data-lang").toLowerCase()==a&&$(t).css("color",s)})})},n=(t=!1)=>{"/"==window.location.pathname&&fetch(`${a}/github?user=${s}`,{method:"GET",cache:"default"}).then(t=>t.json()).then(s=>{t||(window.location.hash="pins"),$(".featured-tabs").removeClass("actived"),$("#tabPins").toggleClass("actived"),$("#featuredList").empty(),s.forEach(t=>{$("#featuredList").append(`
                        <a href='${t.url}' target='_blank' class='item featured-item'>
                            <div class='name'>${t.name}</div>
                            <div class='info'>${t.description}</div>

                            <div class='footer'>
                                <div class='lang lc-${t.name}' data-lang='${t.languages[0]}'>
                                    ${t.languages[0]}
                                </div>

                                <div class='stats'>
                                    <div class='fas fa-star'></div>${c(t.stars)} stars 
                                    <div class='fas fa-code-fork'></div> ${c(t.forks)} forks
                                </div>
                            </div>
                        </a>
                    `),r(`.lc-${t.name}`)}),$("#featured").show()})},l=t=>{"/"==window.location.pathname&&fetch(a).then(t=>t.json()).then(t=>{window.location.hash="apis",$(".featured-tabs").removeClass("actived"),$("#tabApis").toggleClass("actived"),$("#featuredList").empty(),t.list.forEach(t=>{$("#featuredList").append(`
                        <a href='${t.wiki}' target='_blank' class='item featured-item'>
                            <div class='name'>${_.capitalize(t.name)}</div>
                        </a>
                    `)}),$("#featured").show()})},d=t=>{"/"==window.location.pathname&&fetch(o).then(t=>t.json()).then(t=>{window.location.hash="crates",$(".featured-tabs").removeClass("actived"),$("#tabCrates").toggleClass("actived"),$("#featuredList").empty(),t.crates.forEach(t=>{$("#featuredList").append(`
                        <a href='https://crates.io/crates/${t.name}' target='_blank' class='item featured-item'>
                            <div class='name'>${_.capitalize(t.name)}</div>
                            <div class='info'>${t.description}</div>
                            <div class='footer'>${c(t.downloads)} downloads | ${t.newest_version}</div>
                        </a>
                    `)}),$("#featured").show()})},p=t=>{if("/"==window.location.pathname)switch(window.location.hash?$("#featured").addClass("featured-caller"):$("#featured").removeClass("featured-caller"),window.location.hash){case"#apis":l();break;case"#pins":n();break;case"#crates":d();break;default:n(!0)}},h=t=>{fetch(`${window.location.href.replace(window.location.hash,"")+"/export"}`).then(t=>{if(!t.ok)throw Error("Network response was not ok");return t.url}).then(t=>{let s=document.createElement("a");s.href=t,s.download="arquivo.pdf",document.body.appendChild(s),s.click(),document.body.removeChild(s)}).catch(t=>{console.error("There was an error with the fetch operation:",t)})},m=t=>{fetch(i).then(t=>t.json()).then(t=>{$("#projectsList").empty(),t.forEach(t=>{$("#projectsList").append(`
                    <a href='${t.url}' target='_blank' class='item project-item'>
                        ${t.name}
                    </a>
                `)})})};return{apiUri:a,username:s,cratesURI:o,cratesPage:"https://crates.io/crates/",projectsUri:i,apis:()=>l(),crates:()=>d(),pinned:()=>n(),checkApi:()=>p(),colors:t=>r(t),downloadPdf:()=>h(),projectsList:()=>m()}})();$(t=>{lazyload(),Apis.checkApi(),Projects.projects(),ScrollTo.checkScroll(),$("#tabApis").on("click",Apis.apis),$("#tabPins").on("click",Apis.pinned),$("#tabCrates").on("click",Apis.crates),$(window).on("scroll",ScrollTo.checkScroll),$("#scrollToTopBtn").on("click",ScrollTo.top),$("#postDownloadPdfBtn").on("click",Apis.downloadPdf),$("#apisProjectsListBtn").on("click",Projects.apis),$("#pinnedProjectsListBtn").on("click",Projects.pinned),$("#cratesProjectsListBtn").on("click",Projects.crates),$("#featuredProjectsListBtn").on("click",Projects.projects),$("#postTagsBtn").on("click",function(){$(this).toggleClass("actived"),$("#postFlesBtn").removeClass("actived"),$("#postFilesBox").hide(),$("#postTagsBox").slideToggle(250)}),$("#postShareBtn").on("click",function(){$(this).toggleClass("actived"),$("#postShareBox").slideToggle(250)}),$("#projectsBoxBtn").on("click",function(){$(this).toggleClass("actived"),$("#projectsBox").slideToggle(250)}),$("#postFilesBtn").on("click",function(){$(this).toggleClass("actived"),$("#postTagsBtn").removeClass("actived"),$("#postTagsBox").hide(),$("#postFilesBox").slideToggle(250)}),$(".featured-search").on("input",function(){var t=$(this).val().toLowerCase();$(".featured-body > .featured-item").each(function(){$(this).text().toLowerCase().includes(t)?$(this).show():$(this).hide()})}),$("#postShareBoxInput").on("click",function(){$(this).focus(),$(this).select();let t=$(this).val();navigator.clipboard.writeText(t)})});const Mermaid=(t=>{let s=t=>{mermaid.initialize({theme:"dark",securityLevel:"loose"});let s=document.querySelectorAll(".language-mermaid");s.forEach(t=>{t.classList.remove("language-mermaid"),t.classList.add("diagram-mermaid")}),s.forEach(t=>{let s=document.createElement("div");s.classList.add("mermaid"),s.textContent=t.textContent,t.textContent="",t.appendChild(s),mermaid.init(void 0,s)})};s()})(),ScrollTo={top(t){window.scroll({top:0,left:0,behavior:"smooth"})},checkScroll(t){let s=document.getElementById("scrollToTopBtn");window.scrollY>0?s.style.display="block":s.style.display="none"}},Projects=(t=>{let s=t=>{fetch(Apis.apiUri).then(t=>t.json()).then(t=>{$("#apisProjectsListBtn").addClass("actived"),$("#pinnedProjectsListBtn").removeClass("actived"),$("#cratesProjectsListBtn").removeClass("actived"),$("#featuredProjectsListBtn").removeClass("actived"),$("#projectsList").empty(),t.list.forEach(t=>{$("#projectsList").append(`
                    <a href='${t.wiki}' target='_blank' class='item project-item'>
                        ${_.capitalize(t.name)}
                    </a>
                `)})})},a=t=>{fetch(`${Apis.apiUri}/github?user=${Apis.username}`).then(t=>t.json()).then(t=>{$("#pinnedProjectsListBtn").addClass("actived"),$("#apisProjectsListBtn").removeClass("actived"),$("#cratesProjectsListBtn").removeClass("actived"),$("#featuredProjectsListBtn").removeClass("actived"),$("#projectsList").empty(),t.forEach(t=>{$("#projectsList").append(`
                    <a href='${t.url}' target='_blank' class='item project-item'>
                        ${t.name}
                    </a>
                `)})})},i=t=>{fetch(Apis.projectsUri).then(t=>t.json()).then(t=>{$("#featuredProjectsListBtn").addClass("actived"),$("#apisProjectsListBtn").removeClass("actived"),$("#pinnedProjectsListBtn").removeClass("actived"),$("#cratesProjectsListBtn").removeClass("actived"),$("#projectsList").empty(),t.forEach(t=>{$("#projectsList").append(`
                    <a href='${t.url}' target='_blank' class='item project-item'>
                        ${t.name}
                    </a>
                `)})})},o=t=>{fetch(Apis.cratesURI).then(t=>t.json()).then(t=>{$("#cratesProjectsListBtn").addClass("actived"),$("#apisProjectsListBtn").removeClass("actived"),$("#pinnedProjectsListBtn").removeClass("actived"),$("#featuredProjectsListBtn").removeClass("actived"),$("#projectsList").empty(),t.crates.forEach(t=>{$("#projectsList").append(`
                    <a href='${t.url}' target='_blank' class='item project-item'>
                        ${_.capitalize(t.name)}
                    </a>
                `)})})};return{apis:()=>s(),crates:()=>o(),pinned:()=>a(),projects:()=>i()}})();