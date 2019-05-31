// helper function to parse string of latitude and longitude
function parseLatlong(str){
    var regex = /[+-]?\d+(\.\d+)?/g;
    var array = [];
    var match;
    while (match = regex.exec(str)) {
        array.push(match[0]);
    }
    return array;
}

// Initialize map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    styles: 
        [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            }
        ]
    });
    see();
}

// update map when the data comes through
function see(){
    if (park_data)
    {
        var text = park_data[0]["latLong"];
        var array = parseLatlong(text);
        var latitude = array[0];
        var longitude = array[1];
        var lat = parseFloat(latitude);
        var lng = parseFloat(longitude);
    }
    var newLatlng = new google.maps.LatLng(lat,lng);
    map.setCenter(newLatlng);
    addMarkers();
}

var icons = {
    campground: {
        icon: '../static/images/campgroundicon.png'
    },
    visitorcenter: {
        icon: '../static/images/visitorcentericon.png'
    }
};

function addMarkers()
{
    // campgrounds
    for (i = 0; i < camp_data["data"].length; i++)
    {
        var array = parseLatlong(camp_data["data"][i]["latLong"]);
        if (array.length) {
            var currloc = new google.maps.LatLng(array[0],array[1]);
            var marker = new google.maps.Marker({
                position: currloc,
                title:camp_data["data"][i]["name"],
                icon: icons.campground.icon
            });
            marker.setMap(map);
        }
    }
    // visitor centers
    for (i = 0; i < vc_data["data"].length; i++)
    {
        var array = parseLatlong(vc_data["data"][i]["latLong"]);
        if (array.length) {
            var currloc = new google.maps.LatLng(array[0],array[1]);
            var marker = new google.maps.Marker({
                position: currloc,
                title:vc_data["data"][i]["name"],
                icon: icons.visitorcenter.icon
            });
            marker.setMap(map);
        }
    }
}
