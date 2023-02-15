import { deletePost } from './deletePost.js';
import { updatePost } from './deletePost.js';

const menuPostBtn = document.querySelector('.page__post-img-icon');
const menuPost = document.querySelector('#menuPost');
const edit = document.querySelector('#btnUpdate');
const buttonUpdate = document.querySelector('#form-update');
const buttonDelete = document.querySelector('#btnDelete');
const back = document.querySelector('#back');
buttonDelete.addEventListener('click', e => {
  e.preventDefault();
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const id = parts[parts.length - 1];
  deletePost(id);
});
edit.addEventListener('click', function () {
  document.querySelector('form').style.display = 'flex';
  document.querySelector('.page__post-content-box').style.display = 'none';
});

document.querySelector('.button__cancel').addEventListener('click', () => {
  document.querySelector('form').style.display = 'none';
  document.querySelector('.page__post-content-box').style.display = 'flex';
});

buttonUpdate.addEventListener('submit', function (e) {
  e.preventDefault();
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const id = parts[parts.length - 1];
  const formData = new FormData(buttonUpdate);

  updatePost(formData, id);
});

const btns = document.querySelectorAll('.circle');

menuPostBtn.addEventListener('click', function () {
  btns[0].classList.toggle('active');
  btns[1].classList.toggle('active-down');
});

gsap.from(menuPost, {
  delay: 0.5,
  ease: 'expo',
  opacity: 0,
  duration: 1.5,
});

gsap.from(back, {
  delay: 0.5,
  ease: 'expo',
  opacity: 0,
  duration: 1.5,
});

gsap.from('.wrapper', {
  y: '100%',
  delay: 1,
  ease: 'expo',
  duration: 1.5,
});

document.querySelector('body').style.overflow = 'hidden';

setTimeout(() => {
  document.querySelector('body').style.overflow = 'auto';
}, 2600);

const textarea = document.querySelector('textarea');

const maxLength = textarea.getAttribute('maxlength');
const currentLength = textarea.value.length;

document.querySelector('#words').textContent = `${
  maxLength - currentLength
}/500`;

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
