$(document).ready(() => {
    var map = L.map('map').setView([44.772478, 20.475223], 18);
    console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([44.772478, 20.475223])
        .addTo(map)
        .bindPopup('E-drogerie location')
        .openPopup();
});