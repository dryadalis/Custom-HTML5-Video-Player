// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');
const fullscreenButton = player.querySelector('.fullscreenButton');
// Build function
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause()
    }
}

function updateTheButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; 
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up the event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateTheButton);
video.addEventListener('pause', updateTheButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));



let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mouse = false);



// Toggle 

function fullscreen() {
      if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      }
    }

  fullscreenButton.addEventListener('click', fullscreen);
 
  