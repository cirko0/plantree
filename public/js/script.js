/* eslint-disable */
import { CountUp } from './countUp.js';
import { login } from './login.js';
import { register } from './register.js';

const headerBtn = document.querySelectorAll('.header-button');
const conatinerForm = document.querySelector('.container__form');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const points = document.querySelectorAll('.point');
const textAll = document.querySelectorAll('.how__steps-content');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.header--mobile');
const mobileNavLinks = document.querySelectorAll(
  '.header--mobile>.header-nav>a'
);
const number = document.querySelector('#trees_planted');
const mainBtns = document.querySelectorAll('.main__buttons > a');

const imgs = [
  '../../img/step1.webp',
  '../../img/step2.webp',
  '../../img/step3.webp',
  '../../img/step4.webp',
];

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('is-active');
  mobileNav.classList.toggle('open');
  document.querySelector('body').classList.toggle('overflow');
});

mobileNavLinks.forEach(e => {
  e.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('is-active');
    document.querySelector('body').classList.toggle('overflow');
  });
});

for (let i = 0; i < points.length; i++) {
  points[i].addEventListener('click', function (e) {
    const totalPoints = points.length,
      index = e.target.dataset.index,
      completeIndex = document.querySelector('.point--active').dataset.index;
    const text = document.querySelector(`.how__steps-content-${index}`);

    document.querySelector('.bar__fill').style.width = `${
      ((index - 1) / (totalPoints - 1)) * 100
    }%`;

    e.target.classList.add('point--active');
    if (index >= completeIndex) {
      points.forEach(point => {
        if (+point.dataset.index < +e.target.dataset.index) {
          point.classList.add('point--complete');
          point.classList.remove('point--active');
        }
      });

      textAll.forEach(e => {
        e.classList.remove('how__steps-content--active');
      });

      text.classList.add('how__steps-content--active');
      document.querySelector('.img > img').src = imgs[i];
    } else if (index <= completeIndex) {
      points.forEach(point => {
        if (+point.dataset.index > +e.target.dataset.index) {
          point.classList.remove('point--complete');
          point.classList.remove('point--active');
        }
      });

      textAll.forEach(e => {
        e.classList.remove('how__steps-content--active');
      });

      text.classList.add('how__steps-content--active');
      document.querySelector('.img > img').src = imgs[i];
    }
  });
}

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

headerBtn.forEach(e => {
  e.addEventListener('click', function () {
    conatinerForm.classList.add('container__form-active');
  });
});

conatinerForm.addEventListener('click', function (e) {
  if (e.target.classList.contains('container__form')) {
    this.classList.remove('container__form-active');
  }
});

const countUp = new CountUp('trees_planted', 775935, {
  separator: '',
  duration: 2.2,
  useEasing: true,
});

const obsCallback = function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp.start();
    }
  });
};

const observer = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 1,
});

observer.observe(number);

document.querySelector('#form-login').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password);
});

document.querySelector('#form-register').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name-register').value;
  const email = document.getElementById('email-register').value;
  const password = document.getElementById('password-register').value;
  const passwordConfirm = document.getElementById(
    'passwordConfirm-register'
  ).value;

  register(name, email, password, passwordConfirm);
});

gsap.from('.main__heading h1', {
  duration: 1.5,
  x: '-200%',
  delay: '0.5',
  ease: 'expo',
});

gsap.from('.main__heading p', {
  duration: 1.5,
  x: '150%',
  delay: '0.5',
  ease: 'expo',
});

gsap.from('.main .main__buttons', { duration: 1, opacity: 0, delay: 1.3 });

const obsCallbackPlants = function (entries) {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      document.querySelector('#plants').dataset.observe === 'true'
    ) {
      document.querySelector('#plants').dataset.observe = 'false';
      gsap.from('.plants__heading h2', {
        x: '400%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });
      gsap.from('.plants__heading p', {
        x: '-200%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });

      gsap.from('.plants__users-card', {
        y: '100%',
        delay: 1,
        ease: 'expo',
        opacity: 0,
        duration: 1.5,
      });

      gsap.from('.plants .main__buttons', {
        duration: 1,
        opacity: 0,
        delay: 2,
      });
    }
  });
};

const observerPlants = new IntersectionObserver(obsCallbackPlants, {
  root: null,
  threshold: 0.02,
});

observerPlants.observe(document.querySelector('#plants'));

const obsCallbackLine = function (entries) {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      document.querySelector('#line1').dataset.observe === 'true'
    ) {
      document.querySelector('#line1').dataset.observe = 'false';
      gsap.from('#line1', {
        y: '50%',
        delay: 0.5,
        duration: 1.5,
        ease: 'expo',
        opacity: 0,
      });
    }
  });
};

const observerLine = new IntersectionObserver(obsCallbackLine, {
  root: null,
  threshold: 0,
});

observerLine.observe(document.querySelector('#line1'));

const obsCallbackHow = function (entries) {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      document.querySelector('#how').dataset.observe === 'true'
    ) {
      document.querySelector('#how').dataset.observe = 'false';
      gsap.from('.how__heading h2', {
        x: '-400%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });
      gsap.from('.how__heading p', {
        x: '200%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });
      gsap.from('.how__steps', {
        y: '100%',
        delay: 1,
        ease: 'expo',
        opacity: 0,
        duration: 1.5,
      });
    }
  });
};

const observerHow = new IntersectionObserver(obsCallbackHow, {
  root: null,
  threshold: 0.1,
});

observerHow.observe(document.querySelector('#how'));

const obsCallbackStats = function (entries) {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      document.querySelector('#stats').dataset.observe === 'true'
    ) {
      document.querySelector('#stats').dataset.observe = 'false';
      gsap.from('.stats__heading h2', {
        x: '400%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });
      gsap.from('.stats__heading p', {
        x: '-200%',
        delay: 0.5,
        ease: 'expo',
        duration: 1.5,
      });

      gsap.from('.stats__content', {
        y: '100%',
        delay: 1,
        ease: 'expo',
        opacity: 0,
        duration: 1.5,
      });

      gsap.from('.stats .main__buttons', {
        duration: 1,
        opacity: 0,
        delay: 2,
      });
    }
  });
};

const observerStats = new IntersectionObserver(obsCallbackStats, {
  root: null,
  threshold: 0.1,
});

observerStats.observe(document.querySelector('#stats'));

mainBtns.forEach(btn => {
  if (btn.getAttribute('href') === '#') {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      conatinerForm.classList.add('container__form-active');
    });
  }
});

document.querySelectorAll('#app').forEach(el => {
  if (el.getAttribute('href') === '#') {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      conatinerForm.classList.add('container__form-active');
    });
  }
});
