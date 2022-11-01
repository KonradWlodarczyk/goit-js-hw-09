const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStop.setAttribute('disabled', '');

let timer;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startColor = () => {
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled', '');
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopColor = () => {
  btnStart.removeAttribute('disabled', '');
  btnStop.setAttribute('disabled', '');
  clearInterval(timer);
};

btnStart.addEventListener('click', startColor);
btnStop.addEventListener('click', stopColor);
