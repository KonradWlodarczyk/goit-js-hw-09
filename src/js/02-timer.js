import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');

btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      btnStart.removeAttribute('disabled', '');
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let counter;
const calendar = flatpickr(dateInput, options);

const countdown = () => {
  setInterval(() => {
    counter = convertMs(
      calendar.selectedDates[0].getTime() - new Date().getTime()
    );
    if (new Date().getTime() > calendar.selectedDates[0].getTime()) {
      return;
    } else secondsCounter.innerHTML = counter.seconds;
    minutesCounter.innerHTML = counter.minutes;
    hoursCounter.innerHTML = counter.hours;
    daysCounter.innerHTML = counter.days;
    function addLeadingZero(value) {
      if (
        counter.seconds <= 9 ||
        counter.minutes <= 9 ||
        counter.hours <= 9 ||
        counter.days <= 9
      ) {
        secondsCounter.innerHTML = secondsCounter.textContent.padStart(2, '0');
        minutesCounter.innerHTML = minutesCounter.textContent.padStart(2, '0');
        hoursCounter.innerHTML = hoursCounter.textContent.padStart(2, '0');
        daysCounter.innerHTML = daysCounter.textContent.padStart(2, '0');
      }
    }
    addLeadingZero();
  }, 1000);
  btnStart.setAttribute('disabled', '');
};

btnStart.addEventListener('click', countdown);