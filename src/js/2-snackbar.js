import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from '/img/error-icon.svg';
import checkIcon from '/img/check-icon.svg';
import attentionIcon from '/img/attention-icon.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', createNotification);

function createNotification(event) {
  event.preventDefault();
  const inputDelay = Number(event.target.elements.delay.value);
  const inputState = event.target.elements.state.value;
  if (inputDelay <= 0) {
    iziToast.show({
      title: 'Caution',
      titleColor: '#fff',
      message: 'Incorrect delay value',
      position: 'topRight',
      color: '#ffa000',
      titleColor: '#fff',
      messageColor: '#fff',
      progressBarColor: '#bb7b10',
      iconUrl: attentionIcon,
    });
    return;
  }
  createPromise(inputDelay, inputState)
    .then(delay =>
      iziToast.show({
        title: 'Ok',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: '#59a10d',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#326101',
        iconUrl: checkIcon,
      })
    )
    .catch(delay =>
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        progressBarColor: '#b51b1b',
        iconUrl: errorIcon,
      })
    );
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}
