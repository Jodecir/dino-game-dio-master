const dino = document.querySelector('.dino');
const background = document.querySelector('.background-game');
const aliensImg = ['../img/monster-1.png', '../img/monster-2.png', '../img/monster-3.png'];

let isJumping = false;
let isRunning = true;
let isGameOver = false;
let heelHeight = 0;
let jumpedObstacles = 0;

let jumpSound=document.getElementById("jumpSound");

let Key = {
  Space: 32,
  W: 87,
  Up: 38,
}

function handleKeyUp(event) {
  if (event.keyCode === Key.Space || event.keyCode === Key.W || event.keyCode === Key.Up ) {
    if (!isJumping && isRunning) {
      jump();
      jumpSound.play();
    }
  }
}

function jump() {
  const gravity = 4;
  let acceleration = 15;

  isJumping = true;

  let jumpInterval = setInterval(() => {
    if (acceleration > gravity) {
      acceleration *= .92;
    } else {
      if (heelHeight + acceleration <= 0) {
        heelHeight = 0;
        clearInterval(jumpInterval);
        isJumping = false;
      } else {
        acceleration -= 1;
      }
    }
    dino.style.bottom = heelHeight + "px";
    heelHeight += acceleration;
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
  const cactus = document.createElement('div');
  const randomTime = 800 + Math.random() * 800;
  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
      jumpedObstacles++;
      scoreboardRefresh();
    } else if (cactusPosition > 0 && cactusPosition < 60 && heelHeight <= 60) {
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

let scoreboardRefresh = () => {
  document.getElementById("jumpedObstacles").innerHTML = "Jumped Obstacles: " + jumpedObstacles;
}

document.addEventListener('keyup', handleKeyUp);
createCactus();