import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from '/img/error-icon.svg';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    const nowDate = new Date();
    if (nowDate > userSelectedDate) {
      btn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#b51b1b',
        iconUrl: errorIcon,
      });
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
btn.addEventListener('click', handleClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handleClick(event) {
  event.preventDefault();
  btn.disabled = true;
  input.disabled = true;

  const intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - new Date();
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';
      return;
    } else {
      const timerValue = convertMs(deltaTime);
      daysSpan.textContent = addLeadingZero(timerValue.days);
      hoursSpan.textContent = addLeadingZero(timerValue.hours);
      minutesSpan.textContent = addLeadingZero(timerValue.minutes);
      secondsSpan.textContent = addLeadingZero(timerValue.seconds);
    }
  }, 1000);
}
