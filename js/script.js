$(document).ready(function() {



  var mymap = L.map('mapid').setView([48.856578, 2.351828], 6);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 12,
    minZoom: 6,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);


  mymap.bounds = [],

    mymap.setMaxBounds([
      [47.08, 2.39],
    ]);

  $.ajax({
    url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=150&facet=code_dept',
    type: 'GET',
    dataType: 'json',
    success: function(data, statut) {
      for (dept of data['records']) {
        var shape = dept['fields']['geo_shape'];
        var city = dept['fields']['nom_chf'];
        L.geoJSON(shape).addTo(mymap);

        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",fr&APPID=a2044811d73331a75adf74b4c48e2259",
          type: 'GET',
          dataType: 'json',
          success: function(cityData, statut) {
            var marker = L.marker([cityData['coord']['lat'], cityData['coord']['lon']]).addTo(mymap);

            marker.bindPopup('<p>'+cityData['name']+'<br />Pycto du temps</p>').openPopup();

            var popup = L.popup()
            .setLatLng([cityData['coord']['lat'], cityData['coord']['lon']])
            .setContent()
            .openOn(mymap);
          }

        })


      }
    }
  });

});
