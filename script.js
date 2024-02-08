let div = [];
let songArr = [];

async function getSongs(url) {
    const songs = await fetch(url);
    let resp2 = await songs.text();
    // console.log(resp2);
    div = document.createElement("div");
    div.innerHTML = resp2;
    // console.log(div);
    // if (div.querySelectorAll("a").href.endsWith(".mp3")) {
    //     console.log("yes");
    // }
    aOfSongs = div.querySelectorAll("a");
    songArr = [];
    for (let index = 0; index < aOfSongs.length; index++) {
        const element = aOfSongs[index];
        // console.log(element);

        if (element.href.endsWith(".mp3")) {

            songArr.push(element.href);

        }
    };
    return songArr;
}

async function getPlaylists() {

    const playlists = await fetch("https://github.com/abhishek-abhinav/GeetHub/tree/main/Songs/");
    let response = await playlists.text();
    // console.log(response);

    let initialDiv = document.createElement("div");
    initialDiv.innerHTML = response;
    // console.log(div);

    let liOfPlaylists = initialDiv.querySelectorAll("li");
    // console.log(playlists);
    // console.log(playlists.length);

    // let j=0;

    let playlistURL = [];
    for (let i = 1; i < liOfPlaylists.length; i++) {
        playlistURL[i - 1] = liOfPlaylists[i].querySelector("a").href;

        // console.log(playlistURL);
        // const songs = await fetch(playlistURL[i - 1]);
        // let resp2 = await songs.text();
        // // console.log(resp2);
        // div[i - 1] = document.createElement("div");
        // div[i - 1].innerHTML = resp2;
        // // console.log(div);
        // // if (div.querySelectorAll("a").href.endsWith(".mp3")) {
        // //     console.log("yes");
        // // }
        // aOfSongs = div[i - 1].querySelectorAll("a");

        // for (let index = 0; index < aOfSongs.length; index++) {
        //     const element = aOfSongs[index];
        //     // console.log(element);

        //     if (element.href.endsWith(".mp3")) {

        //         songArr.push(element.href);

        //     }
        // };
        // console.log(songArr);

        // console.log(liOfSongs.title);
        // for(let j=1; j<lis.length;i++)
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
    // console.log(songs);
    // if (!audio.paused){
    //     audio.pause();
    //     audio.currentTime=0;
    //     console.log(audio.paused);
    //     console.log(audio.currentTime);
    // }
    // i = 0;

    songUp(songs, 0);







    // for (const i of songs) {
    // audio = songUp(songs[i]);
    // console.log(audio);
    //     audio.play();

    //     // console.log(e.dataset.name+"/cover.jpg");
    //     console.log(audio.src.split("/")[3]+"/"+ audio.src.split("/")[4] + "/cover.png");
    //     nowPlayingImg.src = audio.src.split("/")[3]+"/"+ audio.src.split("/")[4] + "/cover.png";
    //     console.log(audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20"," "));

    //     togglePlayButton();


    //     nowPlaying.innerHTML = audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20"," ");
    //     // await !i.currentTime==i.duration;
    // // }
    // // let durForm = minuteFormat(audio.duration);
    // // console.log(parseInt(audio.duration));
    // // console.log(durForm);
    // // $(".duration").html(durForm);

    // changeTimes();
    // setInterval(() => {
    //     let nowForm = minuteFormat(audio.currentTime);
    //     // console.log(Math.floor(audio.currentTime- min*60));
    //     // console.log(Math.ceil(audio.currentTime- min*60));
    //     $(".currentTime").html(nowForm);
    //     // console.log(min + ":" + sec);
    //     let durForm = minuteFormat(audio.duration);
    //     $(".duration").html(durForm);
    // }, 1000);
    // currentTime = audio.currentTime();
    // console.log(audio.currentTime);
    // $("#play")[0].src == "img/pause.png";
    // console.log($("#play")[0]);


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

        currPlaylistSongs.innerHTML += `
                            <li class="d-flex gap-1" data-name="${song}">
                                <img src="img/GeetHub_logo.png" style="filter: invert();" alt="">
                                <div class="info d-flex justify-content-center flex-column" >
                                    <h6 class="m-0">${song.split("/")[5].split(".mp3")[0].replaceAll("%20", " ")}</h6>
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
            nowPlayingImg.src = audio.src.split("/")[3] + "/" + audio.src.split("/")[4] + "/cover.png";
            // console.log(audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " "));
            $(".now-playing .info p").html("Now Playing");

            togglePlayButton();


            nowPlaying.innerHTML = audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " ");
        })
    })


    asideRight.classList.remove("d-none");
    $(".card").removeClass("col-xl-2");
    // console.log(songs[++i]);

    // console.log(audio.src.split("/")[3] + "/" + audio.src.split("/")[4] + "/cover.png");
    nowPlayingImg.src = audio.src.split("/")[3] + "/" + audio.src.split("/")[4] + "/cover.png";
    // console.log(audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " "));

    $(".now-playing .info p").html("Now Playing");
    $(".now-playing").css("visibility", "unset");


    togglePlayButton();


    nowPlaying.innerHTML = audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " ");


    changeTimes();
    // i=0;
    setInterval(() => {
        // document.querySelector(".circle").style.left = (audio.currentTime / audio.duration) * 100 + "%";
        // console.log((audio.currentTime / audio.duration) * 100 + "%");

        if (audio.currentTime == audio.duration) {


            i++;
            audio.pause();
            $("#play")[0].src = "img/play.png";
            // console.log(i, songs.length);
            if (i < songs.length) {
                songUp(songs, i);
                // i++;
            }
            if (i >= songs.length) {
                audio.pause();
                $("#play")[0].src = "img/play.png";
                $(".now-playing .info p").html("End of GeetList");
            }
            // console.log(audio.currentTime == audio.duration);
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




// let songli = document.querySelector(".currPlaylistSongs .songs ol li");
//         // console.log(songli);
//         // songli.forEach(songToPlay =>{
//             songli.addEventListener("click",() =>{
//                 console.log(song);
//             })
// })


async function main() {
    let playlists = await getPlaylists();
    // console.log(playlists);

    // let audio = new Audio(playlists[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration);
    //     console.log(audio.currentTime);
    // })

    for (const playlist of playlists) {
        // console.log($("ol").html);
        document.querySelector("ol").innerHTML += `<li class="playlist d-flex gap-1" data-name="${playlist}">
        <img src="Songs/${playlist.split("/songs/")[1].replaceAll("%20", " ")}/cover.png" alt="">
        <div class="info d-flex justify-content-center flex-column">
            <h6 class="m-0">${playlist.split("/songs/")[1].replaceAll("%20", " ")}</h6>
            <p class="m-0">Playlist • Abhishek Abhinav</p>
        </div>
        </li> `;

        document.querySelector(".cards").innerHTML += `<div class="playlist card col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xs-12  text-light" data-name="${playlist}">
        <div class="cover d-flex justify-content-center align-items-center">
            <img class="m-3" src="/Songs/${playlist.split("/songs/")[1].replaceAll("%20", " ")}/cover.png" width="100px">
        </div>
        <div class="details">
            <h6>${playlist.split("/songs/")[1].replaceAll("%20", " ")}</h6>
            <p>Playlist • Abhishek Abhinav.</p>
        </div>`
    }

    let pl = document.querySelectorAll(".playlist");

    // let link;
    // let songs;
    // let audio;
    pl.forEach(e => {
        // console.log(this);
        // console.log(HTMLMediaElement.paused);;
        e.addEventListener("click", async () => {
            // if (!audio.paused) {

            // audio.pause();
            // }
            audio = await playSong(e);
            // console.log(audio);

            // console.log(section)
            // console.log(this.e);
        });
    })

    $("#play").click(async () => {
        // console.log($("#play")[0].src);
        if ($("#play")[0].src.includes("img/play.png")) {
            $("#play")[0].src = $("#play")[0].src.replace("play.png", "pause.png")
            // console.log($("#play")[0].src.replace("play.png","pause.png"));
            // console.log($("#play")[0].src);
            if (audio.src == "") {
                songs = await getSongs(playlists[0]);
                // audio = new Audio(songs[0]);
                songUp(songs, 0);
                // console.log(audio);
                // console.log(audio.src.split("/")[5].split(".mp3")[0]);
                nowPlaying.innerHTML = audio.src.split("/")[5].split(".mp3")[0].replaceAll("%20", " ");
                $(".now-playing").css("visibility", "unset");
                audio.play();
                changeTimes();
                $(".now-playing .info p").html("Now Playing");

            }
            // console.log(playlists[0]);
            // songs = await getSongs(playlists[0]);
            // audio = new Audio(songs)
            // audio.play();
            // changeTimes();
            if (audio) {
                // if (!audio.paused) {
                //     // console.log(audio.paused);
                //     audio.pause();
                // }
                // console.log(audio);
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
            let songsLi = songs.filter((value) => {
                return !Number.isNaN(value);
            })
            let len = songsLi.length;
            if (songs.indexOf(audio.src) < len - 1 && songs.indexOf(audio.src) >= 0) {
                // console.log(songs.length, songsLi.length);
                audio.pause();
                songUp(songs, songs.indexOf(audio.src) + 1);
                if (audio.currentTime == audio.duration) {
                    audio.pause;
                    $("#play")[0].src = "img/play.png";
                }
            }
            // console.log(songs.indexOf(audio.src));

            if (songs.indexOf(audio.src) >= songs.length || songs.indexOf(audio.src) < 0) {
                audio.pause();
                $(".now-playing .info p").html("End of GeetList");
                if (audio.currentTime == audio.duration) {
                    audio.pause;
                    $("#play")[0].src = "img/play.png";
                }
            }
            if (songs.indexOf(audio.src) >= songs.length - 1) {
                $(".now-playing .info p").html("End of GeetList");
            }
        }
    });
    $("#prev").click(() => {
        if (songs != undefined) {
            if (songs.indexOf(audio.src) > 0) {
                // console.log(songs.indexOf(audio.src)-1);
                audio.pause();
                songUp(songs, songs.indexOf(audio.src) - 1);
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
    volume.addEventListener("change", e=>{
        audio.volume=e.target.value/100;
    })
}
main();
