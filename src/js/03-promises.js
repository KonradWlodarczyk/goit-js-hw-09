import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}
const addPromises = event => {
  event.preventDefault();
  let delay = Number(delayInput.value);
  let step = Number(stepInput.value);

  for (let i = 1; i <= amountInput.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
};

form.addEventListener('submit', addPromises);
