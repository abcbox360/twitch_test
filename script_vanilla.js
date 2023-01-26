const clientId = 'vacansogf0srrzbeoorcsw3tpqqy69';
const ouathToken = 'zgboixeuolof7ciceqyck9i8ps2get';
const apiUrl = 'https://api.twitch.tv/helix/streams?game_id=21779&type=live&after=';
const apiUrl_user = 'https://api.twitch.tv/helix/users?';
let isLoading = false;
let cursor = '';

document.addEventListener('DOMContentLoaded' , function() {
    appData();
    window.addEventListener('scroll', function() {
        if(document.documentElement.scrollTop + window.innerHeight > document.documentElement.scrollHeight - 200){
            if (!isLoading) {
                appData()
            }
        }
    });
});

function getStreamData(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',apiUrl + cursor);
    xhr.setRequestHeader('client-ID', clientId);
    xhr.setRequestHeader('authorization', 'Bearer ' + ouathToken);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            const data = JSON.parse(this.responseText);
            cb(null ,data)
        }
    };
    xhr.send();
}

function appData() {
    isLoading = true;
    getStreamData((err ,data) => {
        if (err) {
            console.log(err)
        }else { 
            const streams = data.data;
            let userid = '';
            cursor = data.pagination.cursor
            isLoding = true;
            for (let stream of streams) {
                userid += 'id='  + stream.user_id + '&'
            }
            getUserData(userid)
        }
    })
}


function getUserData(userid) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',apiUrl_user + userid);
    xhr.setRequestHeader('client-ID', clientId);
    xhr.setRequestHeader('authorization', 'Bearer ' + ouathToken);
    xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400){
        const data = JSON.parse(this.responseText);
        userData(null, data)
        }
    }
    xhr.send();
}

function userData(err, data){
    const $row = document.querySelector('.row');
    if (err) {
        console.log(err)
    }else {
        for (let user of data.data){
            const div = document.createElement('div');
            $row.appendChild(div);
            div.outerHTML = getColumn(user)
        }
        isLoading = false;
    }
}



function getColumn(user) {
    return `
    <div class="col">
        <div class="previwe">
            <img src="${'https://static-cdn.jtvnw.net/previews-ttv/live_user_' + user.login + '-300x180.jpg'}" onload="this.style.opacity=1"/>
        </div>
        <div class="colname">
            <div class="headimg">
                <img src="${user.profile_image_url}" onload="this.style.opacity=1" />
            </div>
            <div class="namex">
                <div id="channel_name1" class="channel_name" >${user.description}</div>
                <div class="nnaammee">${user.display_name}</div>
            </div>
        </div>
    </div>
    `
}
