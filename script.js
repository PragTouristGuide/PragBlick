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

// body trasy (ukázka – nahraď vlastními souřadnicemi)
var routeCoords = [
  // Pražský hrad
  [50.0903,14.3989],
  // Zámecké schody
  [50.0908,14.4020],
  // Klarov
  [50.0915,14.4035],
  // Park Holubička
  [50.0922,14.4060],
  // Metro Malostranská
  [50.0928,14.4080],
  // Klárov
  [50.0930,14.4095],
  // Lužického semináře (1. průchod)
  [50.0935,14.4105],
  // Cihelná
  [50.0940,14.4110],
  // Lužického semináře (2. průchod, jiný bod než předchozí)
  [50.0945,14.4115],
  // Kampa
  [50.0950,14.4120],
  // Karlův most (začátek)
  [50.0865,14.4125],
  // Karlův most (konec)
  [50.0860,14.4135],
  // Klementinum (vstupní bod)
  [50.0860,14.4140],
  // Mariánské náměstí
  [50.0868,14.4170],
  // Platnéřská
  [50.0870,14.4180],
  // Žatecká
  [50.0872,14.4190],
  // Široká
  [50.0874,14.4200],
  // Maislova
  [50.0875,14.4210],
  // Náměstí France Kafky
  [50.0876,14.4215],
  // Staroměstské náměstí
  [50.0875,14.4212],
  // Melantrichova
  [50.0865,14.4215],
  // Na Můstku
  [50.0855,14.4220],
  // Václavské náměstí
  [50.0810,14.4260]
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



