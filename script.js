// Inicializace mapy
const map = L.map('map').setView([50.087, 14.420], 14);

// Podklad OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Hlavní body trasy
const routePoints = [
  {
    name: "Václavské náměstí",
    coords: [50.081,14.426],
    video: "YOUTUBE_ID_1",
    audio: "audio/vaclavske.mp3",
    more: "https://mojedomena.cz/vaclavske"
  },
  {
    name: "Staroměstské náměstí",
    coords: [50.0875,14.4212],
    video: "YOUTUBE_ID_2",
    audio: "audio/staromestske.mp3",
    more: "https://mojedomena.cz/staromestske"
  },
  {
    name: "Židovská čtvrť",
    coords: [50.090,14.411],
    video: "YOUTUBE_ID_3",
    audio: "audio/zidovska.mp3",
    more: "https://mojedomena.cz/zidovska"
  },
  {
    name: "Karlův most",
    coords: [50.0865,14.4125],
    video: "YOUTUBE_ID_4",
    audio: "audio/karluv.mp3",
    more: "https://mojedomena.cz/karluv"
  },
  {
    name: "Pražský hrad",
    coords: [50.0903,14.3989],
    video: "YOUTUBE_ID_5",
    audio: "audio/hrad.mp3",
    more: "https://mojedomena.cz/hrad"
  }
];

// Přidání markerů a popupů
routePoints.forEach(p => {
  const marker = L.marker(p.coords).addTo(map);
  marker.bindPopup(`
    <div class="popup-content">
      <h3>${p.name}</h3>
      <iframe src="https://www.youtube.com/embed/${p.video}" frameborder="0" allowfullscreen></iframe>
      <button onclick="new Audio('${p.audio}').play()">▶ Audio</button>
      <button class="readmore" onclick="window.open('${p.more}','_blank')">Číst více</button>
    </div>
  `);
});

// Vykreslení trasy (po ulicích)
L.Routing.control({
  waypoints: points.map(p => L.latLng(p.coords)),
  router: L.Routing.osrmv1({
    serviceUrl: 'https://router.project-osrm.org/route/v1'
  }),
  createMarker: function() { return null; },
  lineOptions: {
    styles: [{color: 'red', weight: 4}]
  },
  routeWhileDragging: false,
  addWaypoints: false
}).addTo(map);

// Další body (kavárny, restaurace)
const poiPoints = [
  { name: "Kavárna X", coords: [50.088,14.419], content: "<b>Kavárna X</b><br>Výborná káva" },
  { name: "Restaurace Y", coords: [50.089,14.417], content: "<b>Restaurace Y</b><br>Tradiční kuchyně" }
];

poiPoints.forEach(p => {
  L.marker(p.coords, {icon:L.icon({iconUrl:"https://cdn-icons-png.flaticon.com/512/2965/2965567.png",iconSize:[24,24]})})
    .addTo(map)
    .bindPopup(p.content);
});

