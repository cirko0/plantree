/* eslint-disable */

import { showAlert } from './alerts.js';

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? `${window.location.href.split('/')[0]}//${
            window.location.href.split('/')[2]
          }/api/v1/users/updateMyPassword`
        : `${window.location.href.split('/')[0]}//${
            window.location.href.split('/')[2]
          }/api/v1/users/updateMe`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (type !== 'password') {
      await axios({
        method: 'PATCH',
        url: `${window.location.href.split('/')[0]}//${
          window.location.href.split('/')[2]
        }/api/v1/activity`,
        data: Object.fromEntries([...data]),
      });
    }

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${
          type === 'password'
            ? 'Lozinka je uspesno promenjena.'
            : 'Podaci su uspesno promenjeni.'
        } `
      );
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.res);
  }
};
