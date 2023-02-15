/* eslint-disable */

import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/users/login`,
      data: { email, password },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Uspešna prijava!');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
