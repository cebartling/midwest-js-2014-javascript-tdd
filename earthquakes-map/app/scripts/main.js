$(document).ready(function () {
    'use strict';

    var mapView = new EarthquakeMap.MapView();
    mapView.init().fetchData();
});
