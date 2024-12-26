console.log("Welcome to Spotify");

// Initialize the Variables
let audioElement = new Audio(); 
let songIndex = -1; 
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Afsanay - Talha Anjum", filePath: "songs/afsanay.mp3", coverPath: "covers/afsanay.jpg" },
  { songName: "Bematlab - Asim Azhar x Talha Anjum", filePath: "songs/bematlab.mp3", coverPath: "covers/bematlab.jpeg" },
  { songName: "BTDT(Been There Done That)", filePath: "songs/btdt.mp3", coverPath: "covers/btdt.jpg" },
  { songName: "Come Through", filePath: "songs/come through.mp3", coverPath: "covers/come through.jpeg" },
  { songName: "Day Dreamer", filePath: "songs/day dreamer.mp3", coverPath: "covers/day dreamer.png" },
  { songName: "Don't Care", filePath: "songs/don't care.mp3", coverPath: "covers/don't care.jpg" },
  { songName: "Gumaan - YS", filePath: "songs/gumaan.mp3", coverPath: "covers/gumaan.jpg" },
  { songName: "Heartbreak Kid", filePath: "songs/heartbreak kid.mp3", coverPath: "covers/heartbreak kid.jpeg" },
  { songName: "Kaun Talha", filePath: "songs/kaun talha.mp3", coverPath: "covers/kaun talha.webp" },
  { songName: "Love Lost", filePath: "songs/love lost.mp3", coverPath: "covers/love lost.png" },
  { songName: "Secrets", filePath: "songs/secrets.mp3", coverPath: "covers/secrets.jpg" },
  { songName: "Smile", filePath: "songs/smile.mp3", coverPath: "covers/smile.png" },
];

// Populate song items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Pause all song icons
const pauseAll = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

// Play song icon for the current song
const startPlay = (id) => {
  let playButton = document.getElementById(id);
  playButton.classList.remove("fa-circle-play");
  playButton.classList.add("fa-circle-pause");
};

// Stop song icon for the current song
const stopPlay = (id) => {
  let playButton = document.getElementById(id);
  playButton.classList.remove("fa-circle-pause");
  playButton.classList.add("fa-circle-play");
};

// Handle master play/pause
masterPlay.addEventListener("click", () => {
  if (songIndex === -1) {
    alert("No song selected! Please select a song from the playlist."); // Notify the user
    return;
  }
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    startPlay(songIndex);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    stopPlay(songIndex);
  }
});

// Listen to timeupdate for progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
  myProgressBar.value = progress;

// Update current time
let currentMinutes = Math.floor(audioElement.currentTime / 60);
let currentSeconds = Math.floor(audioElement.currentTime % 60);
currTime.textContent = `${currentMinutes.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;

// Update duration if available
if (!isNaN(audioElement.duration)) {
let durationMinutes = Math.floor(audioElement.duration / 60);
let durationSeconds = Math.floor(audioElement.duration % 60);
totalDuration.textContent = `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
} else {
totalDuration.textContent = "00:00"; // Default value
}
});

// Seek functionality
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle individual song play
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    pauseAll();
    songIndex = parseInt(e.target.id);
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    totalDuration.textContent = "Loading..."; // Temporary message
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    startPlay(songIndex);

// Next and Previous functionality
document.getElementById("next").addEventListener("click", () => {
  if (songIndex === -1) {
    alert("No song selected! Please select a song from the playlist.");
    return;
  }
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  pauseAll();
  startPlay(songIndex);
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex === -1) {
    alert("No song selected! Please select a song from the playlist.");
    return;
  }
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  pauseAll();
  startPlay(songIndex);
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// Ensure duration updates after metadata is loaded
audioElement.addEventListener("loadedmetadata", () => {
  if (!isNaN(audioElement.duration)) {
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration % 60);
    totalDuration.textContent = `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
  }
});
});
});
