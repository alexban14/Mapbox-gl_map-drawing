mapboxgl.accessToken = 'you map box api token'; // Replace with your Mapbox access token

// Create the map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [24.146701716036144, 45.80259694742082],
  zoom: 12
});

// Initialize the draw control
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true
  }
});

// Add the draw control to the map
map.addControl(draw);

let isDrawing = false;
let lineId;

// Event listener for double-click on the map
map.on('dblclick', function(event) {
	event.preventDefault(); // Prevent the default zoom-in behavior
	startDrawing(event);
  });

// Event listener for click on the map
map.on('click', endDrawing);

// Function to start drawing a line
function startDrawing(event) {
	if (!isDrawing) {
	  const startCoordinates = [event.lngLat.lng, event.lngLat.lat];
	  const line = {
		type: 'FeatureCollection',
		features: [{
		  id: 'drawing-line',
		  type: 'Feature',
		  geometry: {
			type: 'LineString',
			coordinates: [startCoordinates]
		  },
		  properties: {}
		}]
	  };
	  
	  lineId = draw.add(line);
	  isDrawing = true;
	  console.log("START COORDINATES: ", startCoordinates);
	}
  }
  
  // Function to end drawing a line
  function endDrawing(event) {
	if (isDrawing) {
	  const endCoordinates = [event.lngLat.lng, event.lngLat.lat];
	  const line = draw.get(lineId);
	  line.geometry.coordinates.push(endCoordinates);
	  
	  draw.delete(lineId); // Remove the existing line
	  draw.add(line); // Add the updated line with the new coordinates
	  
	  isDrawing = false;
	  console.log("END COORDINATES: ", endCoordinates);
	}
  }