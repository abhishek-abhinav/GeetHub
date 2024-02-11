let div = [];
let songArr = [];
let resp;


async function getSongs(url) {
    // console.log(`${url}`);
    
    let response2 = resp[url];
    // console.log(response2);
    songArr = [];
    for (let index = 0; index < response2.length; index++) {
        const element = response2[index];
        // console.log(element);

        if (element.endsWith(".mp3")) {

            songArr.push(url + "/" + element.replaceAll(" ","%20"));

        }
    };
    // console.log(songArr);
    return songArr;
}
//https://github.com/abhishek-abhinav/songs/tree/main/Songs/
// https://cors-anywhere.herokuapp.com/https://github.com/abhishek-abhinav/songs/tree/main/Songs/
// https://raw.githubusercontent.com/abhishek-abhinav/songs/tree/main/Songs/

async function getPlaylists() {
    let response = resp.Songs;
    // console.log(response);

    let playlistURL = [];
    for (let i = 0; i < response.length; i++) {
        playlistURL[i] = "Songs/"+ response[i].replaceAll(" ","%20");

        // console.log(playlistURL);
    }

    return playlistURL;
}

let audio = new Audio();

const togglePlayButton = () => {
    if (audio.paused) {
        $("#play")[0].src = "img/play.png"
    }
    else {
        $("#play")[0].src = "img/pause.png"
    }
}

function minuteFormat(aud) {
    let min = Math.floor(aud / 60);
    let sec = Math.floor(aud - min * 60);

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return (min + ":" + sec);
}





// let i=0;
function changeTimes() {
    setInterval(() => {
        let nowForm = minuteFormat(audio.currentTime);
        // console.log(Math.floor(audio.currentTime- min*60));
        // console.log(Math.ceil(audio.currentTime- min*60));
        $(".currentTime").html(nowForm);
        // console.log(min + ":" + sec);
        let durForm = minuteFormat(audio.duration);
        $(".duration").html(durForm);


    }, 1000);
}

let nowPlaying = document.querySelector(".now-playing .info h6");
let nowPlayingImg = document.querySelector(".now-playing img");

let i = 0;


let songs;




const playSong = async (e) => {
    audio.pause();
    let link = e.dataset.name;
    songs = await getSongs(link);

    songUp(songs, 0);

    return audio;
}





function songUp(songs, i) {
    audio = new Audio(songs[i]);
    // return audio;
    audio.play();
    let asideRight = document.querySelector(".right");
    let currPlaylistSongs = document.querySelector(".currPlaylistSongs .songs ol");
    currPlaylistSongs.innerHTML = ""
    // console.log(asideRight.classList);

    let per = (audio.currentTime / audio.duration) * 100;
    document.querySelector(".play-seek").style.background = `linear-gradient(to right, #e0bb22 0%, transparent 0%)`;
    document.querySelector(".circle").style.left = 0;
    // console.log((audio.currentTime / audio.duration) * 100 + "%");


    songs.forEach(async song => {
        // console.log(song);
        currPlaylistSongs.innerHTML += `
                            <li class="d-flex gap-1" data-name="${song}">
                                <img src="img/GeetHub_logo.png" style="filter: invert();" alt="">
                                <div class="info d-flex justify-content-center flex-column" >
                                    <h6 class="m-0">${song.split("/")[2].split(".mp3")[0].replaceAll("%20", " ")}</h6>
                                    <p class="m-0">Artist • Abhishek Abhinav</p>
                                </div>
                            </li>`;
        // console.log(song);
        // console.log(document.querySelector(".currPlaylistSongs .songs ol li"));

    })





    let songli = document.querySelectorAll(".currPlaylistSongs .songs ol li");
    // console.log(songli);
    songli.forEach(songToPlay => {
        songToPlay.addEventListener("click", () => {
            audio.pause();
            // console.log(audio.src);
            audio = new Audio(songToPlay.dataset.name);
            audio.play();
            nowPlayingImg.src = audio.src.split("/")[4] + "/" + audio.src.split("/")[5] + "/cover.png";
            // console.log(audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " "));
            $(".now-playing .info p").html("Now Playing");

            togglePlayButton();


            nowPlaying.innerHTML = audio.src.split("/")[6].split(".mp3")[0].replaceAll("%20", " ");
        })
    })


    asideRight.classList.remove("d-none");
    $(".card").removeClass("col-xl-2");
    // console.log(songs[++i]);

    // console.log(audio.src.split("/")[3] + "/" + audio.src.split("/")[4] + "/cover.png");
    nowPlayingImg.src = audio.src.split("/")[4] + "/" + audio.src.split("/")[5] + "/cover.png";
    // console.log(audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " "));

    $(".now-playing .info p").html("Now Playing");
    $(".now-playing").css("visibility", "unset");


    togglePlayButton();


    nowPlaying.innerHTML = audio.src.split("/")[6].split(".mp3")[0].replaceAll("%20", " ");


    changeTimes();
    // i=0;
    setInterval(() => {
        // document.querySelector(".circle").style.left = (audio.currentTime / audio.duration) * 100 + "%";
        // console.log((audio.currentTime / audio.duration) * 100 + "%");

        if (audio.currentTime == audio.duration) {


            i++;
            audio.pause();
            $("#play")[0].src = "img/play.png";
            console.log(i, songs.length);
            if (i < songs.length) {
                songUp(songs, i);
                // i++;
            }
            if (i >= songs.length) {
                audio.pause();
                $("#play")[0].src = "img/play.png";
                $(".now-playing .info p").html("End of GeetList");
            }
            console.log(audio.currentTime == audio.duration);
            // console.log(i);
        }

    }, 1000);

    setInterval(() => {
        document.querySelector(".circle").style.left = (audio.currentTime / audio.duration) * 98 + "%";
        let per = (audio.currentTime / audio.duration) * 100;
        document.querySelector(".play-seek").style.background = `linear-gradient(to right, #e0bb22 ${per + "%"}, transparent 0%)`;
        // console.log((audio.currentTime / audio.duration) * 100 + "%");
    }, 100)

}



async function main() {
    const fetched = await fetch("songlist.json");
    resp = await fetched.json();
    // console.log(resp);

    let playlists = await getPlaylists();
    // console.log(playlists);


    for (const playlist of playlists) {
        // console.log(playlist);
        document.querySelector("ol").innerHTML += `<li class="playlist d-flex gap-1" data-name="${playlist}">
        <img src="${playlist}/cover.png" alt="">
        <div class="info d-flex justify-content-center flex-column">
            <h6 class="m-0">${playlist.split("Songs/")[1].replaceAll("%20", " ")}</h6>
            <p class="m-0">Playlist • Abhishek Abhinav</p>
        </div>
        </li> `;
        // console.log(document.querySelector("ol").innerHTML);
        document.querySelector(".cards").innerHTML += `<div class="playlist card col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xs-12  text-light" data-name="${playlist}">
        <div class="cover d-flex justify-content-center align-items-center">
            <img class="m-3" src="${playlist}/cover.png" width="100px">
        </div>
        <div class="details">
            <h6>${playlist.split("Songs/")[1].replaceAll("%20", " ")}</h6>
            <p>Playlist • Abhishek Abhinav.</p>
        </div>`
        // console.log(playlist.split("Songs/")[1]);
    }

    let pl = document.querySelectorAll(".playlist");
    pl.forEach(e => {
        e.addEventListener("click", async () => {
            audio = await playSong(e);
        });
    })

    $("#play").click(async () => {
        // console.log($("#play")[0].src);
        if ($("#play")[0].src.includes("img/play.png")) {
            $("#play")[0].src = $("#play")[0].src.replace("play.png", "pause.png")
            if (audio.src == "") {
                songs = await getSongs(playlists[0]);
                // audio = new Audio(songs[0]);
                songUp(songs, 0);
                // console.log(audio);
                // console.log(audio.src.split("/")[5].split(".mp3")[0]);
                nowPlaying.innerHTML = audio.src.split("/")[6].split(".mp3")[0].replaceAll("%20", " ");
                $(".now-playing").css("visibility", "unset");
                audio.play();
                changeTimes();
                $(".now-playing .info p").html("Now Playing");

            }
            if (audio) {
                audio.play();
            }
            else {
                playSong();
                // console.log(audio);
                audio.play();
            }
            // console.log(audio.src);
        }
        else {
            $("#play")[0].src = "img/play.png"
            audio.pause();
        }
    })






    $("#next").click(() => {
        if (songs != undefined) {
            let audInd = audio.src.split("GeetHub/")[1];
            // console.log(songs);
            let songsLi = songs.filter((value) => {
                return !Number.isNaN(value);
            })
            let len = songsLi.length;
            // console.log(songs.indexOf(audInd), len-1);
            if (songs.indexOf(audInd) < len - 1 && songs.indexOf(audInd) >= 0) {
                // console.log(songs.length, songsLi.length);
                audio.pause();
                songUp(songs, songs.indexOf(audInd) + 1);
                if (audio.currentTime == audio.duration) {
                    audio.pause();
                    $("#play")[0].src = "img/play.png";
                }
            }
            // console.log(songs.indexOf(audio.src));

            if (songs.indexOf(audInd) >= len-1 || songs.indexOf(audInd) < 0) {
                audio.pause();
                $(".now-playing .info p").html("End of GeetList");
                $("#play")[0].src = "img/play.png";
                if (audio.currentTime == audio.duration) {
                    $("#play")[0].src = "img/play.png";
                    audio.pause();
                }
            }
            if (songs.indexOf(audInd) >= songs.length - 1) {
                $(".now-playing .info p").html("End of GeetList");
            }
        }
    });
    $("#prev").click(() => {
        let audInd = audio.src.split("GeetHub/")[1];
        if (songs != undefined) {
            if (songs.indexOf(audInd) > 0) {
                // console.log(songs.indexOf(audio.src)-1);
                audio.pause();
                songUp(songs, songs.indexOf(audInd) - 1);
            }
        }
    });
    // if (audio!=paused){
    // console.log(audio);
    // }

    $(".seekbar").click(e => {
        // console.log((e.offsetX/e.target.getBoundingClientRect().width)*100+"%");
        document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 98 + "%"
        // console.log(audio.currentTime);
        audio.currentTime = (e.offsetX / e.target.getBoundingClientRect().width * audio.duration)
    })

    let volume = document.querySelector(".volume input")
    volume.addEventListener("change", e => {
        audio.volume = e.target.value / 100;
    })
}
main();
