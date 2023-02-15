import { showAlert } from './alerts.js';

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/users/logout`,
    });
    if (res.data.status === 'success') {
      // location.reload(true); // When we reload with true passed in function we get fresh refresh
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', 'Greška pri odjavljivanju! Pokušajte ponovo.');
  }
};
