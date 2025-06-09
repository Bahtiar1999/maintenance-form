const urlParams = new URLSearchParams(window.location.search);
const mesinId = urlParams.get('id');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwF-Q5xQBcR6OEZ3YoUdcBmBaraB9fH2-Nfu04A0kfnrWTmZeI5-FGxYBJoteaonuVp/exec'; // Ganti dengan URL Web App kamu

// Ambil deskripsi unit
function fetchDeskripsiUnit() {
  fetch(`${scriptURL}?action=getDeskripsi&id=${mesinId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('idMesin').textContent = data["ID Mesin"];
      document.getElementById('namaMesin').textContent = data["Nama Mesin"];
      document.getElementById('merk').textContent = data["Merk Elektromotor"];
      document.getElementById('daya').textContent = data["Daya (kW)"];
      document.getElementById('rpm').textContent = data["RPM"];
      document.getElementById('lokasi').textContent = data["Lokasi"];
    });
}

// Ambil histori maintenance
function fetchHistoriMaintenance() {
  fetch(`${scriptURL}?action=getMaintenance&id=${mesinId}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tabelHistori');
      tbody.innerHTML = '';
      data.forEach(item => {
        let row = `<tr>
          <td>${item.Tanggal}</td>
          <td>${item["Job Description"]}</td>
          <td>${item["Part Diganti"]}</td>
          <td>${item["Running Hours"]}</td>
          <td>${item.Remark}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    });
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  fetchDeskripsiUnit();
  fetchHistoriMaintenance();
});
