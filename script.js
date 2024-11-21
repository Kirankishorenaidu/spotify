console.log("Welcome");

// Select DOM elements
const playButtons = document.querySelectorAll('.songListPlay');
const masterPlay = document.getElementById('masterPlay');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const songInfo = document.querySelector('.songInfo');
const progressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const sideimg = document.getElementById('sideimg');

let currentSongIndex = 0;  // To keep track of the currently playing song
let isPlaying = false;      // Flag to track whether the song is playing

// List of songs (just an example, replace with actual audio file paths)
const songs = [
    { name: "Undipo",img:"undipo.jpeg", src: "Undipo - SenSongsMp3.Co.mp3" },
    { name: "Maaya", img:"maya.jpeg",src: "Maya - SenSongsMp3.Co (1).mp3" },
    { name: "Dammare",img:"vikramarkudu.jpeg", src: "[iSongs.info] 01 - Dammare Damma.mp3" },
    { name: "Majili",img:"majili.jpeg", src: "[iSongs.info] 05 - Ye Manishike Majiliyo.mp3" },
    { name: "Devara",img:"devara.jpeg", src: "Daavudi.mp3" },
    { name: "Waka Waka",img:"wakawaka.jpeg", src: "Waka Waka - Dj Lemon.mp3" },
    { name: "Infactuation",img:"infactuation.jpeg", src: "[iSongs.info] 01 - Infatuation.mp3" },
    { name: "Manam",img:"Manam_poster.jpg", src: "Kanulanu Thaake - SenSongsMp3.Co.mp3" },
    { name: "Anaganaganaga",img:"https://www.justwatch.com/images/poster/258342876/s718/aravinda-sametha-veera-raghava.jpg", src: "[iSongs.info] 01 - Anaganaganaga.mp3" },
    { name: "Dimaak Kharaab",img:"ismart.jpeg", src: "Dimaak Kharaab - SenSongsMp3.Co.mp3" },
];

// Create an Audio object for the current song
let audio = new Audio(songs[currentSongIndex].src);

// Update the songInfo section with the current song name
function updateSongInfo() {
    songInfo.textContent = `${songs[currentSongIndex].name} `;
    gif.style.display = isPlaying ? 'inline-block' : 'none';
    sideimg.src = songs[currentSongIndex].img ? songs[currentSongIndex].img : 'spped.jpeg'; 

}

// Play or pause the current song
function togglePlayPause() {
    if (audio.paused || audio.ended) {
        // If the audio is paused or stopped, play the audio
        audio.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        // If the audio is playing, pause the audio
        audio.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }

    // Update song info
    updateSongInfo();
}

// Handle play button click for each song
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentSongIndex = index;
        audio.src = songs[currentSongIndex].src;
        togglePlayPause();
    });
});

// Master play/pause button click
masterPlay.addEventListener('click', () => {
    togglePlayPause();
});

// Handle next song
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;  // Loop back to first song
    audio.src = songs[currentSongIndex].src;
    togglePlayPause();
});

// Handle previous song
previousButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;  // Loop to last song if at first
    audio.src = songs[currentSongIndex].src;
    togglePlayPause();
});

// Update progress bar as the song plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Set up progress bar change
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

