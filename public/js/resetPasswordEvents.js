import { resetPassword } from './resetPassword.js';

const resetPasswordBtn = document.querySelector('#form-resetPassword');

resetPasswordBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const token = parts[parts.length - 1];
  const password = document.querySelector('#resetPassword').value;
  const passwordConfirm = document.querySelector('#resetPasswordConfirm').value;
  resetPassword(token, password, passwordConfirm);
});
