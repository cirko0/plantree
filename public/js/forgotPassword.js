import { forgotPassword } from './resetPassword.js';

const forgotPasswordBtn = document.querySelector('#form-forgot');

forgotPasswordBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.querySelector('#forgotEmail').value;
  forgotPassword(email);
});
