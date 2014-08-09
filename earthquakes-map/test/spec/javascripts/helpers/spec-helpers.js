window.earthquakeJson = function () {
    return {
        "type": "FeatureCollection",
        "metadata": {
            "generated": 1386393485000,
            "url": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson",
            "title": "USGS Magnitude 2.5+ Earthquakes, Past Hour",
            "status": 200,
            "api": "1.0.13",
            "count": 2
        }, "features": [
            {
                "type": "Feature",
                "properties": {
                    "mag": 3.4,
                    "place": "102km NNE of Chirikof Island, Alaska",
                    "time": 1386391376000,
                    "updated": 1386391882887,
                    "tz": -600,
                    "url": "http://earthquake.usgs.gov/earthquakes/eventpage/ak10885062",
                    "detail": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak10885062.geojson",
                    "felt": null,
                    "cdi": null,
                    "mmi": null,
                    "alert": null,
                    "status": "automatic",
                    "tsunami": null,
                    "sig": 178,
                    "net": "ak",
                    "code": "10885062",
                    "ids": ",ak10885062,",
                    "sources": ",ak,",
                    "types": ",general-link,geoserve,nearby-cities,origin,tectonic-summary,",
                    "nst": 42,
                    "dmin": 0.4770054,
                    "rms": 0.82,
                    "gap": 97.199992224001,
                    "magType": "ml",
                    "type": "earthquake",
                    "title": "M 3.4 - 102km NNE of Chirikof Island, Alaska"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-155.0237, 56.6812, 78.2]
                },
                "id": "ak10885062"
            },
            {
                "type": "Feature",
                "properties": {
                    "mag": 2.8,
                    "place": "34km WSW of Anchor Point, Alaska",
                    "time": 1386390856000,
                    "updated": 1386391121968,
                    "tz": -600,
                    "url": "http://earthquake.usgs.gov/earthquakes/eventpage/ak10885056",
                    "detail": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak10885056.geojson",
                    "felt": null,
                    "cdi": null,
                    "mmi": null,
                    "alert": null,
                    "status": "automatic",
                    "tsunami": null,
                    "sig": 121,
                    "net": "ak",
                    "code": "10885056",
                    "ids": ",ak10885056,",
                    "sources": ",ak,",
                    "types": ",general-link,geoserve,nearby-cities,origin,tectonic-summary,",
                    "nst": 35,
                    "dmin": 0.4868869,
                    "rms": 0.74,
                    "gap": 143.99998848,
                    "magType": "ml",
                    "type": "earthquake",
                    "title": "M 2.8 - 34km WSW of Anchor Point, Alaska"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-152.3636, 59.6231, 43.3]
                },
                "id": "ak10885056"
            }
        ], "bbox": [-155.0237, 56.6812, 43.3, -152.3636, 59.6231, 78.2]};
};