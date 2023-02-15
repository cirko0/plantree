import { updateSettings } from './updateSettings.js';
import { logout } from './logout.js';

const logOutBtn = document.querySelector('#logOutBtn');

document.querySelector('#form-update').addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(document.querySelector('#form-update'));
  if (!Object.fromEntries([...formData]).photo) {
    formData.append(
      'photo',
      document.querySelector('.form__user-photo').src.split('/')[
        document.querySelector('.form__user-photo').src.split('/').length - 1
      ]
    );
  }
  updateSettings(formData, 'data');
});

logOutBtn.addEventListener('click', logout);

document.querySelector('#form-updatePassword').addEventListener('submit', e => {
  e.preventDefault();
  const currentPassword = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  updateSettings({ currentPassword, password, passwordConfirm }, 'password');
});
