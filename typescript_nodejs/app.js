"use strict";
//exports.__esModule = true;
var form = document.querySelector('form');
var addressInput = document.getElementById('address');
var GOOGLE_API_KEY = 'AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs';

function searchAddressHandler(event) {
    event.preventDefault();
    var coordinates = { lat: 40.41, lng: -73.99 }; // Coordinates from Google API will come
    document.getElementById('map').innerHTML = '';
    new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
            zoom: 16
        })
    });
}
/*
function searchAddressHandler(event:Event)
{
    event.preventDefault()
    const enteredAddress = addressInput.value
    axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response =>{
        if(response.data.status!=='OK')
        {
            throw new Error('Could not fetch Location')
        }
        const coordinates = response.data.results[0].geometry.location
        const map = new google.maps.Map(document.getElementById('map'),{
            center:coordinates,
            zoom:8
        })
        new google.maps.Marker({position:coordinates,map:map})
    })
    .catch(err =>{
        alert(err.message)
        console.log(err)
    })
}*/
form.addEventListener('submit', searchAddressHandler);