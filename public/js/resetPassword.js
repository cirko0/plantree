import { showAlert } from './alerts.js';

export const forgotPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/users/forgotPassword`,
      data: { email },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Mail poslat!');
    }
    // When we reload with true passed in function we get fresh refresh
  } catch (err) {
    showAlert('error', 'Greška pri slanju mail-a! Pokusajte ponovo.');
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/users/resetPassword/${token}`,
      data: { password, passwordConfirm },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Lozinka je uspešno resetovana');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 500);
    }
    // When we reload with true passed in function we get fresh refresh
  } catch (err) {
    showAlert('error', 'Greška pri resetovanju lozinke! Pokušajte ponovo.');
  }
};
