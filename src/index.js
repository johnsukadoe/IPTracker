import {validateIp} from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const ipBtn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

ipBtn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData(){
    if(validateIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_jhplLXpJIwHIA5XItwXL7ezGoOUFR&ipAddress=${ipInput.value}`)
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
}
