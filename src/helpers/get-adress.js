export async function getAddress (ip = "8.8.8.8"){
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_jhplLXpJIwHIA5XItwXL7ezGoOUFR&ipAddress=${ip}`)
    
    const data = await response.json();

    return data;
}