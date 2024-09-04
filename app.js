console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); // Load the first song by default
let masterPlay = document.getElementById('masterPlay'); // Play/Pause button
let myProgressBar = document.getElementById('myProgressBar'); // Progress bar element
let gif = document.getElementById('gif'); // Gif shown when a song is playing
let masterSongName = document.getElementById('masterSongName'); // Display the current song name
let songItems = Array.from(document.getElementsByClassName('songItem')); // List of songs in the UI

// Array of songs with details like name, file path, and cover image
let songs =  [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

// Set song images and names in the UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Set song cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Set song name
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play(); // Play the song
        masterPlay.classList.remove('fa-play-circle'); // Change play icon to pause icon
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show the gif
    } else {
        audioElement.pause(); // Pause the song
        masterPlay.classList.remove('fa-pause-circle'); // Change pause icon to play icon
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide the gif
    }
})

// Listen to Events: Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    // Calculate the progress percentage and update the progress bar value
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

// Seek functionality: Jump to a specific part of the song when progress bar is changed
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Function to reset all song play icons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Handle individual song play/pause click
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // Reset all play icons
        songIndex = parseInt(e.target.id); // Get the index of the clicked song
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`; // Update the audio source
        masterSongName.innerText = songs[songIndex].songName; // Update the song name display
        audioElement.currentTime = 0; // Reset the song time
        audioElement.play(); // Play the new song
        gif.style.opacity = 1; // Show the gif
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Handle next song click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0; // If the last song is playing, loop back to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update the audio source
    masterSongName.innerText = songs[songIndex].songName; // Update the song name display
    audioElement.currentTime = 0; // Reset the song time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Handle previous song click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; // If the first song is playing, stay at the first song
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update the audio source
    masterSongName.innerText = songs[songIndex].songName; // Update the song name display
    audioElement.currentTime = 0; // Reset the song time
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
