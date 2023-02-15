/* eslint-disable */

import { showAlert } from './alerts.js';

export const register = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/users/signup`,
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Uspešno ste napravili nalog!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Pravljenje naloga nije uspelo! Pokusajte ponovo.');
  }
};
