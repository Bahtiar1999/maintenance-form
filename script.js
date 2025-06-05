const form = document.getElementById('maintenanceForm');
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('idMesin').value = urlParams.get('id') || "UNKNOWN";

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((val, key) => data[key] = val);

  fetch('https://script.google.com/macros/s/AKfycbxqkOwPvRU54QxQ3JpYto3JAqouuPKHObBGDBbt2Hsfy1OoV-FZIYWoWdO1E4sEVKnX/exec', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.text())
    .then(txt => {
      alert('Berhasil disimpan!');
      form.reset();
    }).catch(err => alert('Gagal: ' + err));
});
