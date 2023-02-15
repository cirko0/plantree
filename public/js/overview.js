/* eslint-disable */

import { createPost } from './createPost.js';

const form = document.querySelectorAll('form')[0];

const root = document.documentElement;
const marqueeElementsDisplayed =
  getComputedStyle(root).getPropertyValue('--marquee-elements-displayed') + 1;
const marqueeContent = document.querySelector('ul.marquee-content');

if (marqueeElementsDisplayed && marqueeContent) {
  root.style.setProperty('--marquee-elements', marqueeContent.children.length);

  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }
}

document
  .querySelector('.container__card-create')
  .addEventListener('click', function () {
    document.querySelector('.container__overlay').classList.add('active');
  });
document
  .querySelector('.container__overlay')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('container__overlay'))
      document.querySelector('.container__overlay').classList.remove('active');
  });

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append('id', document.querySelectorAll('.container__card').length);

  const data = Object.fromEntries([...formData]);
  data.name = document.querySelector('.header-content p').textContent;
  data.photo = document.querySelector('.header-content img').src.split('/')[
    document.querySelector('.header-content img').src.split('/').length - 1
  ];
  createPost(formData, data);
});

gsap.from('#pay', {
  y: '50%',
  delay: 0.5,
  ease: 'expo',
  opacity: 0,
  duration: 1.5,
});

const cardsContainer = document.querySelector('.container');

const obsCallbackCards = function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && cardsContainer.dataset.observe === 'true') {
      cardsContainer.dataset.observe = 'false';
      gsap.from(cardsContainer, {
        delay: 0.5,
        y: '50%',
        ease: 'ease-out',
        opacity: 0,
        duration: 1,
      });
    }
  });
};

const observerCards = new IntersectionObserver(obsCallbackCards, {
  root: null,
  threshold: 0,
});

observerCards.observe(document.querySelector('#card'));

// !!!!!!!!!!!!!!!!!!!!!!!!!!PAYPAL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

PayPal.Donation.Button({
  env: 'sandbox',
  business: 'cirko007ivan@gmail.com',
  image: {
    src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
    title: 'PayPal - The safer, easier way to pay online!',
    alt: 'Donate with PayPal button',
  },
  onComplete: function (params) {},
}).render('#paypal');

const textarea = document.querySelector('textarea');

textarea.addEventListener('input', ({ currentTarget: target }) => {
  const maxLength = target.getAttribute('maxlength');
  const currentLength = target.value.length;

  if (currentLength >= maxLength) {
    return;
  }

  document.querySelector('#words').textContent = `${
    maxLength - currentLength
  }/500`;
});
