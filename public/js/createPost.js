import { showAlert } from './alerts.js';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const createPost = async (formData, data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/post/`,
      data: formData,
    });

    await axios({
      method: 'POST',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/activity/`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Uspešno kreirana objava!');
      setTimeout(() => {
        location.reload(true);
      }, 500);
      // When we reload with true passed in function we get fresh refresh
    }
  } catch (err) {
    showAlert('error', 'Greška prilikom objavljivanja! Pokušaj ponovo.');
  }
};
