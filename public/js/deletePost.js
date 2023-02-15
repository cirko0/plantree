import { showAlert } from './alerts.js';

export const deletePost = async id => {
  try {
    await axios({
      method: 'DELETE',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/post/${id}`,
    });

    showAlert('success', 'Uspešno ste obrisali objavu!');
    setTimeout(() => {
      location.assign('/overview');
    }, 500);
    // When we reload with true passed in function we get fresh refresh
  } catch (err) {
    showAlert('error', 'Greška prilikom brisanja objave! Pokušajte ponovo.');
  }
};

export const updatePost = async (formData, id) => {
  try {
    await axios({
      method: 'PATCH',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/post/${id}`,
      data: formData,
    });

    await axios({
      method: 'PATCH',
      url: `${window.location.href.split('/')[0]}//${
        window.location.href.split('/')[2]
      }/api/v1/activity`,
      data: Object.fromEntries([...formData]),
    });

    showAlert('success', 'Uspešno uređena objava!');
    setTimeout(() => {
      location.reload();
    }, 500);
    // When we reload with true passed in function we get fresh refresh
  } catch (err) {
    showAlert('error', 'Greška sa uređivanjem objave! Pokusajte ponovo.');
  }
};
