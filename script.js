const clientId = 'vacansogf0srrzbeoorcsw3tpqqy69';
const ouathToken = 'zgboixeuolof7ciceqyck9i8ps2get';
const apiUrl = 'https://api.twitch.tv/helix/streams?game_id=21779&type=live&after=';
const apiUrl_user = 'https://api.twitch.tv/helix/users?';
let cursor = '';
let isLoading = false;

$(document).ready(function() {
    appData();
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
            if (!isLoading) {
                appData();
            }
        }
    })
})

function getStreamData(cb){
    $.ajax({
        url: apiUrl + cursor,
        type: 'get',
        headers: {
            'Authorization': 'Bearer ' + ouathToken,
            'Client-Id': clientId
        },
        success: (response) => {
            cb(null,response);
        },
        error: (err) =>{
            cb(err);
        }
    })
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
    $.ajax({
        url: apiUrl_user + userid,
        type: 'get',
        headers: {
            'Authorization': 'Bearer ' + ouathToken,
            'Client-Id': clientId
        },
        success: (response) => {
            userData(null,response);
        },
        error: (err) =>{
            userData(err);
        }
    })
}


function userData(err, data){
    const $row = $('.row');
    if (err) {
        console.log(err)
    }else {
        for (let user of data.data){
            $row.append(getColumn(user));
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



