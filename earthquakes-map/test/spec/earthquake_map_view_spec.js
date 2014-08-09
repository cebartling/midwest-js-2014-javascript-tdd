/*global describe, it */
'use strict';

(function () {
    describe('EarthquakeMap.MapView', function () {
        var mapFixture;

        beforeEach(function () {
            mapFixture = setFixtures('<div id="map"></div>');
        });

        describe('constructor', function () {
            it('should create a new instance', function () {
                expect(new EarthquakeMap.MapView()).toBeDefined();
            });

            it('tileUrl property is set', function () {
                var mapView = new EarthquakeMap.MapView();
                expect(mapView.tileUrl).toBe('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
            });

            it('creates a new L.Map object and assigns it to the mapObj property', function () {
                var spy = spyOn(L, 'Map').and.callThrough();
                var mapView = new EarthquakeMap.MapView();
                expect(spy).toHaveBeenCalledWith('map');
                expect(mapView.mapObj instanceof L.Map).toBeTruthy();
            });

            it('creates a new TileLayer passing in the tileUrl and options', function () {
                var spy = spyOn(L, 'TileLayer').and.callThrough();
                var mapView = new EarthquakeMap.MapView();
                var options = {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 18
                };
                expect(spy).toHaveBeenCalledWith(mapView.tileUrl, options);
                expect(mapView.tileLayer instanceof L.TileLayer).toBeTruthy();
            });

            it('sets isInitialized to false', function () {
                var mapView = new EarthquakeMap.MapView();
                expect(mapView.isInitialized).toBeFalsy();
            });
        });

        describe('instance methods and properties', function () {
            var mapView;

            beforeEach(function () {
                mapView = new EarthquakeMap.MapView();
            });

            describe('init function', function () {
                it('exists', function () {
                    expect(mapView.init).toBeDefined();
                });

                it('creates a new LatLng object', function () {
                    var spy = spyOn(L, 'LatLng').and.callThrough();
                    mapView.init();
                    expect(spy).toHaveBeenCalledWith(44.9833, -93.2667);
                });

                it('calls setView on the Map object', function () {
                    var mapSpy = spyOn(mapView.mapObj, 'setView');
                    mapView.init();
                    expect(mapSpy).toHaveBeenCalled();
                    expect(mapSpy.calls.mostRecent().args[0] instanceof L.LatLng).toBeTruthy();
                    expect(mapSpy.calls.mostRecent().args[1]).toBe(3);
                });

                it('calls addLayer on the Map object', function () {
                    var mapSpy = spyOn(mapView.mapObj, 'addLayer');
                    mapView.init();
                    expect(mapSpy).toHaveBeenCalled();
                    expect(mapSpy.calls.mostRecent().args[0] instanceof L.TileLayer).toBeTruthy();
                });

                it('set isInitialized to true', function () {
                    mapView.init();
                    expect(mapView.isInitialized).toBeTruthy();
                });

                it('returns itself as an expression value', function () {
                    var result = mapView.init();
                    expect(result).toBe(mapView);
                });
            });

            describe('fetchData function', function () {
                var ajaxSpy, result;

                beforeEach(function () {
                    ajaxSpy = spyOn($, 'ajax');
                    result = mapView.fetchData();
                });

                it('sets window.eqfeed_callback to a proxied MapView.prototype.processResults', function () {
                    expect(window.eqfeed_callback instanceof Function).toBeTruthy();
                });

                it('invokes $.ajax function', function () {
                    var options = {
                        url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp',
                        dataType: 'jsonp'
                    };
                    expect(ajaxSpy).toHaveBeenCalledWith(options);
                });

                it('returns itself as an expression value', function () {
                    expect(result).toBe(mapView);
                });
            });

            describe('processResults function', function () {
                var earthquakeJsonResults, circleConstructorSpy, circleSpy, circle;

                beforeEach(function () {
                    earthquakeJsonResults = window.earthquakeJson();
                    circle = L.circle([59.000, -152.00], 2200, {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5
                    });
                });

                it('iterates features and creates circle map annotations', function () {
                    circleConstructorSpy = spyOn(L, 'circle').and.callThrough();
                    mapView.processResults(earthquakeJsonResults);
                    expect(circleConstructorSpy.calls.count()).toBe(2);
                    var argsForFirstCall = circleConstructorSpy.calls.argsFor(0);
                    expect(argsForFirstCall[0]).toEqual([56.6812, -155.0237]);
                    expect(argsForFirstCall[1]).toEqual(Math.pow(10, 3.4));
                    expect(argsForFirstCall[2]).toEqual({color: 'red', fillColor: '#f03', fillOpacity: 0.5});
                    var argsForSecondCall = circleConstructorSpy.calls.argsFor(1);
                    expect(argsForSecondCall[0]).toEqual([59.6231, -152.3636]);
                    expect(argsForSecondCall[1]).toEqual(Math.pow(10, 2.8));
                    expect(argsForSecondCall[2]).toEqual({color: 'red', fillColor: '#f03', fillOpacity: 0.5});
                });

                it('adds each circle to the map', function () {
                    circleSpy = spyOn(circle, 'addTo');
                    spyOn(L, 'circle').and.returnValue(circle);
                    mapView.processResults(earthquakeJsonResults);
                    expect(circleSpy.calls.count()).toBe(2);
                    expect(circleSpy.calls.argsFor(0)[0]).toBe(mapView.mapObj);
                    expect(circleSpy.calls.argsFor(1)[0]).toBe(mapView.mapObj);
                });

                it('binds a popup tooltip to each circle', function () {
                    circleSpy = spyOn(circle, 'bindPopup');
                    spyOn(L, 'circle').and.returnValue(circle);
                    mapView.processResults(earthquakeJsonResults);
                    expect(circleSpy.calls.count()).toBe(2);
                    expect(circleSpy.calls.argsFor(0)[0]).toBe('102km NNE of Chirikof Island, Alaska<br/>Magnitude: 3.4');
                    expect(circleSpy.calls.argsFor(1)[0]).toBe('34km WSW of Anchor Point, Alaska<br/>Magnitude: 2.8');
                });
            });
        });

    });
})();
