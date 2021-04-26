//Mapbox token
mapboxgl.accessToken = "pk.eyJ1IjoiYW5keTNneCIsImEiOiJja25jcjA2OTYyMWh0MnZwaDNibnc0MDRuIn0.R9ogfHLEI7dwyGI_t71IiA";

//Create Map
var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [-71.091542,42.358862],
        zoom: 12
    });

//Create Marker    
var marker = new mapboxgl.Marker()
 



//REAL MAP CODE
async function run(){
    // get bus data and add marker to map    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
    marker.setLngLat(lnglat_list[0]);
    marker.addTo(map);

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
var lnglat_list = [];
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	var bus_data = json.data;
    lnglat_list.unshift([bus_data[0].attributes.longitude, bus_data[0].attributes.latitude]);
	return json.data;
}

run();