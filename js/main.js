'use strict';

// import config from 'co'

console.log('WikiTube');

// api youtube
var YT_KEY = 'my api';


function searchYouTubeWiki() {
    var txtFromUser = getTxtFromUser();
    if (!txtFromUser) txtFromUser = 'nodejs';

    var api = runYoutubeSearch(txtFromUser);
    api.then(function (searchResults) {
        renderVideoFromYouTube(searchResults);
        renderListVideos(searchResults);
    });

    var apiWiki = runSearchWiki(txtFromUser);
    apiWiki.then(function (searchResults) {
        renderListWiki(searchResults);
    });
}


function getTxtFromUser() {
    return document.querySelector(`.input-search-user`).value;
}

function runYoutubeSearch(value) {
    return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`)
        .then(function (res) {
            return res.data;
        })
}

function runSearchWiki(value) {
    return axios
        .get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${value}&limit=5`)
        .then(function (res) {
            return res.data;
        })
}


function renderVideoFromYouTube(res) {
    var video = res.items[0].id.videoId;

    var strHtml = `  
           <iframe class="animated fadeInDown" src="https://www.youtube.com/embed/${video}" 
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>`;
    document.querySelector('.video-found').innerHTML = strHtml;
}



function renderListVideos(res) {
    var strHtml = '';
    var allVideos = res.items;

    allVideos.forEach(function (currVideo, idx) {
        strHtml += `
        <div onclick="playVideoByUrl('${currVideo.id.videoId}')">
    <li>
      <img src="${currVideo.snippet.thumbnails.default.url}">
      <h3>${currVideo.snippet.title}</h3>
      <div>${currVideo.snippet.title}</div>
    </li>
    </div>
    `;
    });
    document.querySelector('.list-videos').innerHTML = strHtml;
}


function playVideoByUrl(video) {

    var strHtml = `  
           <iframe  src="https://www.youtube.com/embed/${video}" 
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>`;
    document.querySelector('.video-found').innerHTML = strHtml;
}


function renderListWiki(listWiki) {
    var strHtml = '';

    listWiki[1].forEach(function (currWiki, idx) {

        strHtml += `
    <li>
    <h3>${ listWiki[1][idx]}</h3>
    <div>${ listWiki[2][idx]}</div> 
    <a href="${listWiki[3][idx]}">link for wikipedia</a>
    </li>
    `;

    });
    document.querySelector('.list-wiki').innerHTML = strHtml;
}