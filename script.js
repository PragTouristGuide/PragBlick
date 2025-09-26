// Inicializace mapy
const map = L.map('map').setView([50.087, 14.420], 14);

// Podklad OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// aktivace geolokace
map.locate({setView: true, watch: true, maxZoom: 18});

let userMarker;
let userHeading = 0; // úhel směru (ve stupních)

// vlastní ikona šipky
const arrowIcon = L.divIcon({
  className: "arrow-icon",
  html: "&#8593;", // šipka ↑ (můžeš nahradit SVG ikonou)
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// poloha GPS
map.on('locationfound', function(e) {
  if (userMarker) {
    userMarker.setLatLng(e.latlng);
  } else {
    userMarker = L.marker(e.latlng, {icon: arrowIcon}).addTo(map)
      .bindPopup("Jste tady");
  }
});

// chyba GPS
map.on('locationerror', function() {
  alert("Nepodařilo se zjistit vaši polohu. Zkontrolujte nastavení GPS.");
});

// orientace telefonu (kompas)
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientationabsolute", function(event) {
    if (event.alpha !== null) {
      userHeading = event.alpha; // azimut
      if (userMarker) {
        // otočí šipku podle směru
        userMarker._icon.style.transform = `rotate(${userHeading}deg)`;
      }
    }
  }, true);
}

// Hlavní body trasy
const routePoints = [
  {
    name: "Václavské náměstí",
    coords: [50.082383,14.426169],
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
    coords: [50.089641, 14.417987],
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

// body trasy (ukázka – nahraď vlastními souřadnicemi)
var routeCoords = [
  // Václavské náměstí
  [50.082383,14.426169],
  // Na Můstku
  [50.084875, 14.422195],
  // Melantrichova
  [50.085309, 14.421289],
  // Melantrichova
  [50.085693, 14.420646],
  // Staroměstské náměstí
  [50.0875,14.4212],
  // Náměstí France Kafky
  [50.0876,14.4215],
  // Maislova
  [50.0875,14.4210],
  // Široká
  [50.0874,14.4200],
  // Žatecká
  [50.0872,14.4190],
  // Platnéřská
  [50.0870,14.4180],
  // Mariánské náměstí
  [50.0868,14.4170],
  // Klementinum
  [50.0860,14.4140],
  // Karlův most (začátek)
  [50.0860,14.4135],
  // Karlův most (konec)
  [50.0865,14.4125],
  // Mostecká
  [50.0868,14.4115],
  // Malostranské náměstí
  [50.0872,14.4105],
  // Thunovská
  [50.0875,14.4095],
  // Nové zámecké schody
  [50.0880,14.4040],
  // Pražský hrad
  [50.0903,14.3989]
];

// vykreslení polyline
var polyline = L.polyline(routeCoords, {color: 'red', weight: 4}).addTo(map);

// nastavení mapy tak, aby zahrnula celou trasu
map.fitBounds(polyline.getBounds());

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













