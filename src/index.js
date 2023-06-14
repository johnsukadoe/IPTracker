import {validateIp, addTileLayer} from "./helpers";
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const ipBtn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");


const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30,40]
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
    center:[51.505 , -0.09],
    zoom:13,

});

addTileLayer(map);
L.marker([51.505 , -0.09], {icon: markerIcon}).addTo(map); 



ipBtn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData(){
    if(validateIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_jhplLXpJIwHIA5XItwXL7ezGoOUFR&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(data => setInfo(data))
    }
}

function handleKey(event){
    if(event.key == "Enter"){
        getData();
    }
}


function setInfo(mapData){
    console.log(mapData);
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${mapData.location.region}, ${mapData.location.country} ${mapData.as.asn}`;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([mapData.location.lat , mapData.location.lng]);
    L.marker([mapData.location.lat , mapData.location.lng], {icon: markerIcon}).addTo(map);
}



