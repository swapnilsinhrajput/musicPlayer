const image = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volume = document.getElementById('volume');

// Music
const songs = [
  {
    name: 'Astrix - Deep Jungle Walk',
    displayName: 'Deep Jungle Walk',
    artist: 'Astrix',
    imageSrc: 'img/He.art.jpg',
  },
  {
    name: 'Astrix - Genetic Lottery',
    displayName: 'Genetic Lottery',
    artist: 'Astrix',
    imageSrc: 'img/Genetic%20Lottery.jpg',
  },
  {
    name:'Mandragora - AK-47',
    displayName: 'AK-47',
    artist: 'Mandragora',
    imageSrc: 'img/AK-47.jpg',
  },
  {
    name:'Mandragora - Sem Chao',
    displayName: 'Sem Chao',
    artist: 'Mandragora',
    imageSrc: 'img/Sem%20Chao.jpg',
  }
];

//Check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play')
  music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


let songIndex = 0;   //Current Song

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.m4a`;
  image.src = `${song.imageSrc}`;
  if (isPlaying) {
    music.play();
  }
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
}

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

//On Load - Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
const { duration, currentTime } = e.srcElement;
    //Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Volume
volume.addEventListener('input', (e) => {
  music.volume = e.target.value;
});

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

