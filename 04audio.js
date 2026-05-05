const MyPlayer = document.getElementById("MyPlayer");
const volumeRange = document.getElementById("volumeRange");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const songTitle = document.getElementById("songTitle");
const status = document.getElementById("status");
const currentSongName = document.getElementById("currentSongName");
let Song = ["music/01airball.mp3", "music/02elysees.mp3", "music/03moon.mp3", "music/04nothing.mp3", "music/05rain.mp3", "music/06travel.mp3"]
let MusicTracks = 0
//musicIcon控制
function updatePlayPauseBtn() {
    document.getElementById("play").style.display = MyPlayer.isPlaying && !MyPlayer.isPaused ? 'none' : 'inline';
    document.getElementById("pause").style.display = MyPlayer.isPlaying && !MyPlayer.isPaused ? 'inline' : 'none';
};
function updateVolMuteBtn() {
    document.getElementById("mute").style.display = MyPlayer.muted == true ? "inline" : "none";
    document.getElementById("volume").style.display = MyPlayer.muted == false ? "inline" : "none";
};
function changSong(trackIndex) {
    MusicTracks = trackIndex;
    MyPlayer.src = Song[MusicTracks];
    MyPlayer.load();
    MyPlayer.play();
    MyPlayer.isPlaying = true;
    MyPlayer.isPaused = false;
    updatePlayPauseBtn();
};
function progressT() {
    if (!isNaN(MyPlayer.duration)) {
        let currentTimeMin = parseInt(MyPlayer.currentTime / 60);
        let currentTimeSce = parseInt(MyPlayer.currentTime % 60);
        let durationMin = parseInt(MyPlayer.duration / 60);
        let durationSce = parseInt(MyPlayer.duration % 60);
        let displayCTMin = currentTimeMin < 10 ? "0" + currentTimeMin : currentTimeMin;
        let displayCTSce = currentTimeSce < 10 ? "0" + currentTimeSce : currentTimeSce;
        let displayDTMin = durationMin < 10 ? "0" + durationMin : durationMin;
        let displayDTSce = durationSce < 10 ? "0" + durationSce : durationSce;
        progressText.innerHTML = `${displayCTMin}:${displayCTSce}/${displayDTMin}:${displayDTSce}`
    }
};
function getSongName(path) {
    return path.split('/').pop().split('.').shift();
};

document.getElementById("play").addEventListener("click", () => {
    MyPlayer.isPlaying = true;
    MyPlayer.isPaused = false;
    MyPlayer.play();
    updatePlayPauseBtn()
});
document.getElementById("pause").addEventListener("click", () => {
    MyPlayer.isPlaying = false;
    MyPlayer.isPaused = true;
    MyPlayer.pause();
    updatePlayPauseBtn()
});
document.getElementById("stop").addEventListener("click", () => {
    MyPlayer.isPlaying = false;
    MyPlayer.isPaused = true;
    MyPlayer.pause();
    progressText.value = 0;
    MyPlayer.currentTime = 0;
    updatePlayPauseBtn()
});
document.getElementById("prev").addEventListener("click", () => {
    MusicTracks--
    if (MusicTracks < 0) {
        MusicTracks = Song.length - 1
    }
    changSong(MusicTracks);
});
document.getElementById("next").addEventListener("click", () => {
    MusicTracks++
    if (MusicTracks >= Song.length) {
        MusicTracks = 0
    }
    changSong(MusicTracks);
});
document.getElementById("return").addEventListener("click", () => {
    MyPlayer.currentTime -= 5
});
document.getElementById("fast").addEventListener("click", () => {
    MyPlayer.currentTime += 5
});
//聲音控制
document.getElementById("volume").addEventListener("click", () => {
    MyPlayer.muted = true;
    updateVolMuteBtn();
});
document.getElementById("mute").addEventListener("click", () => {
    MyPlayer.muted = false;
    updateVolMuteBtn();
});
MyPlayer.volume = 0.8;
volumeRange.value = MyPlayer.volume;
volumeRange.addEventListener("input", () => {
    MyPlayer.volume = volumeRange.value;
    document.getElementById("mute").style.display = volumeRange.value <= 0 ? "inline" : "none";
    document.getElementById("volume").style.display = volumeRange.value > 0 ? "inline" : "none";
});
//曲終自動撥放下一首
MyPlayer.addEventListener("ended", () => {
    document.getElementById("next").click();
});
//進度條控制
MyPlayer.addEventListener("timeupdate", () => {
    progress.value = (MyPlayer.currentTime / MyPlayer.duration) * 100;
    progressT();
});
progress.addEventListener("input", () => {
    MyPlayer.currentTime = (progress.value / 100) * MyPlayer.duration
});
//狀態列顯示
MyPlayer.addEventListener("play", () => {
    songTitle.innerHTML = `曲名:${getSongName(Song[MusicTracks])}`;
    status.innerHTML = '狀態:播放中'
});
MyPlayer.addEventListener("pause", () => {
    status.innerHTML = '狀態:已停止'
});
//下方曲目列表
for (let index = 0; index < Song.length; index++) {
    currentSongName.innerHTML += `<h2 onclick="changSong(${index})">${getSongName(Song[index])}</h2>`;
};