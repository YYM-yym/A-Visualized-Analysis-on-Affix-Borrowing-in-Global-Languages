const mymap = L.map('issMap').setView([40, 0], 1);
mymap.options.minZoom = 1.5;
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { noWrap: true }, { attribution });
tiles.addTo(mymap);

namelist = [];
var clickedPoint = '';
jQuery(function() {
  $.get('lan_info1.csv', function(csvString) {
    data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;
    console.log(data);
    for (var i in data) {
      var row = data[i];
      if (row.Population == 0) {
        var circle = L.circle([row.Latitude, row.Longitude], {
          color: '#bcbcbc',
          fillColor: '#bcbcbc',
          fillOpacity: 0.5,
          radius: 20000,
        });
        console.log(circle);
      } else if (row.Population < 10000) {
        var circle = L.circle([row.Latitude, row.Longitude], {
          color: '#f9c29c',
          fillColor: '#f9c29c',
          fillOpacity: 0.5,
          radius: 20000,
        });
      } else if (row.Population < 1000000) {
        var circle = L.circle([row.Latitude, row.Longitude], {
          color: '#fe9b56',
          fillColor: '#fe9b56',
          fillOpacity: 0.5,
          radius: 20000,
        });
      } else {
        var circle = L.circle([row.Latitude, row.Longitude], {
          color: '#c45000',
          fillColor: '#c45000',
          fillOpacity: 0.5,
          radius: 20000,
        });
      }
      // console.log("the point:",circle);
      circle
        .addTo(mymap)
        .bindTooltip(row.Language + ', Population: ' + row.Population, 'tooltip')
        .on('click', function(event) {
          clickedPoint = event.target._tooltip._content.split(',')[0];
          var rad = event.sourceTarget.getRadius();
          // event.sourceTarget.setRadius(100000);
          event.sourceTarget.setRadius(100000);
          setTimeout(() => {
            event.sourceTarget.setRadius(20000);
          }, 3000);
          console.log(clickedPoint);
          window.test(clickedPoint);
          $(`circle[name='${clickedPoint}']`).trigger('click');
          if (window.setlang1) {
            window.setlang1(clickedPoint);
          }
        });
    }
    // console.log(namelist);
  });
});

var legend = L.control({ position: 'topright' });
legend.onAdd = function(mymap) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML =
    '<select id="demoselect"><option value="def"></option><option value="afr">Africa</option><option value="ang">Australia & New Guinea</option><option value="eur">Eurasia</option><option value="nam">North America</option><option value="sam">South America</option><option value="sao">Southeast Asia & Oceania</option></select>';
  div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  return div;
};
legend.addTo(mymap);

$('select').change(function(e) {
  var options = document.getElementById('demoselect').value;
  let nowvalue = '';
  if (options == 'def') {
    nowvalue = 'all';
    mymap.setView([40, 0], 1);
  } else if (options == 'afr') {
    nowvalue = 'Africa';
    mymap.setView([0, 20], 3);
  } else if (options == 'ang') {
    nowvalue = 'Australia & New Guinea';
    mymap.setView([-20, 130], 3);
  } else if (options == 'eur') {
    nowvalue = 'Eurasia';
    mymap.setView([50, 80], 2);
  } else if (options == 'nam') {
    nowvalue = 'North America';
    mymap.setView([35, -90], 3);
  } else if (options == 'sam') {
    nowvalue = 'South America';
    mymap.setView([-18, -65], 3);
  } else if (options == 'sao') {
    nowvalue = 'Southeast Asia & Oceania';
    mymap.setView([0, 120], 3);
  }
  window.test3(nowvalue);
});

var legend1 = L.control({ position: 'bottomright' });

function getColor(d) {
  return d > 1000000 ? '#c45000' : d > 10000 ? '#fe9b56' : d > 0 ? '#f9c29c' : '#bcbcbc';
}

// legend1.onAdd = function (mymap) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10000, 1000000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '–' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend1.addTo(mymap);
