EarthquakeMap.MapView = (function () {

    MapView.name = 'MapView';

    function MapView() {
        this.tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        this.mapObj = new L.Map('map');
        this.tileLayer = new L.TileLayer(this.tileUrl, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        });
        this.isInitialized = false;
    }

    MapView.prototype.init = function () {
        var latLong = new L.LatLng(44.9833, -93.2667);
        var zoom = 3;
        this.mapObj.setView(latLong, zoom)
        this.mapObj.addLayer(this.tileLayer);
        this.isInitialized = true;
        return this;
    };

    MapView.prototype.processResults = function (results) {
        for (var i = 0; i < results.features.length; i++) {
            var earthquake = results.features[i];
            var coordinates = earthquake.geometry.coordinates;
            var magnitude = Math.pow(10, earthquake.properties.mag);
            var circle = L.circle([coordinates[1], coordinates[0]], magnitude, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            });
            circle.addTo(this.mapObj);
            circle.bindPopup(earthquake.properties.place + '<br/>Magnitude: ' + earthquake.properties.mag);
        }
    };

    MapView.prototype.fetchData = function () {
        window.eqfeed_callback = $.proxy(this.processResults, this);
        $.ajax({
            url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp',
            dataType: 'jsonp'
        });
        return this;
    };

    return MapView;
})();
