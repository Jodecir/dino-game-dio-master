const dino = document.querySelector('.dino');
const background = document.querySelector('.background-game');

let isJumping = false;
let isRunning = true;
let isGameOver = false;
let height = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping && isRunning) jump();
  }
}

function jump() {
  const gravity = 4;
  let acceleration = 15;
  let step = 0;

  isJumping = true;

  let jumpInterval = setInterval(() => {
    if (acceleration > gravity) {
      acceleration *= .92;
    } else {
      if (height + acceleration <= 0) {
        height = 0;
        clearInterval(jumpInterval);
        isJumping = false;
      } else {
        acceleration -= 1;
      }
    }
    dino.style.bottom = height + "px";
    height += acceleration;
    step++;

    if (!isRunning) clearInterval(jumpInterval);
  }, 20);
}

function showWarn(warning) {
  const warnEl = document.createElement("h1");
  warnEl.className = "game-over";
  warnEl.innerText = warning;

  background.appendChild(warnEl);
  background.style.webkitAnimationPlayState = "paused";
}

function createCactus() {
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && height <= 60) {
      clearInterval(leftTimer);
      isRunning = false;
      isGameOver = true;
      showWarn("Game Over")
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
    
    if (!isRunning) clearInterval(leftTimer);
  }, 20);

  if (isRunning) setTimeout(createCactus, randomTime);
}

document.addEventListener('keyup', handleKeyUp);
createCactus();