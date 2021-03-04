const coverImage = document.getElementById("cover-art");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const trackTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

// Track Title
const songList = [
  { title: "Akaraka", artist: "The Cavemen" },
  { title: "9 Lives", artist: "Asa" },
  { title: "Bolo Bolo", artist: "The Cavemen" },
  { title: "BrokEn", artist: "Coldplay" },
  { title: "Empty", artist: "Juice Wrld" },
  { title: "Lady", artist: "Rema" },
  { title: "Man In The Mirror", artist: "Michael Jackson" },
  { title: "Mercy", artist: "Shawn Mendes" },
  { title: "Only You", artist: "Ric Hassani" },
  { title: "Pull Up", artist: "Burna Boy" },
  { title: "Thriller", artist: "Michael Jackson" },
];

// Current Song
let index = 0;

// Load Song
loadTrack(songList[index]);

// Update Track Details
function loadTrack(track) {
  trackTitle.innerText = track.title;
  artistName.innerText = track.artist;
  audio.src = `songs/${track.title}.mp3`;
  coverImage.src = `./covers/${track.title}.jpg`;
}

function playTrack() {
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseTrack() {
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// Go To Previous Song
function prevSong() {
  index--;

  if (index < 0) {
    index = songList.length - 1;
  }

  loadTrack(songList[index]);

  playTrack();
}

// Go To Next Song
function nextSong() {
  index++;

  if (index > songList.length - 1) {
    index = 0;
  }

  loadTrack(songList[index]);

  playTrack();
}

// Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
}

// Move progress
function moveProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Click Events
playBtn.addEventListener("click", () => {
  const playing = playBtn.querySelector("i.fas").classList.contains("fa-pause");
  if (playing) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// Switch Track
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Update Time
audio.addEventListener("timeupdate", updateProgress);

// Move Position
progressContainer.addEventListener("click", moveProgress);

// When Song Ends
audio.addEventListener("ended", nextSong);
