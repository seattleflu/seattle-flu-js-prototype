import "./main.scss";
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import config from './config';

import mapData from "./mapData";


const mapboxToken = config.mapboxToken;
mapboxgl.accessToken = mapboxToken;

let app = document.querySelector('#app')
const menu = d3.select("#app").append("div").attr("id", "menu")
const chartContainer = d3.select("#app").append("div").attr("id", "chart-container");
const mapContainer = d3.select("#app").append("div").attr("id", "map-container");


const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.32, 47.60],
  zoom: 10,
});

map.on("load", function() {
  map.addSource('city', {
    type: 'geojson',
    data: mapData.city
  });
  map.addLayer({
    "id": "city",
    "type": "fill",
    "source": "city",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#00aa99",
      "fill-outline-color": "white"
    }
  });

  map.addSource('neighborhoods', {
    type: 'geojson',
    data: mapData.neighborhoods
  });
  map.addLayer({
    "id": "neighborhoods",
    "type": "fill",
    "source": "neighborhoods",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#00aa99",
      "fill-outline-color": "white"
    }
  });  

  map.addSource('cra',{ 
    type: 'geojson',
    data: mapData.cra 
  });
  map.addLayer({
    "id": "cra",
    "type": "fill",
    "source": "cra",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#00aa99",
      "fill-outline-color": "white"
    }
  });

  map.addSource('censusTracts', {
    type: 'geojson',
    data: mapData.censusTracts
  });
  map.addLayer({
    "id": "censusTracts",
    "type": "fill",
    "source": "censusTracts",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#00aa99",
      "fill-outline-color": "white"
    }
  });
});


const mapLevels = [...Object.keys(mapData)];

for (let i = 0; i < mapLevels.length; i++) {
  let id = mapLevels[i];
  
  let link = document.createElement('a');

  link.href = '#';
  link.className = 'active';
  link.textContent = id;

  link.onclick = function(e) {
    console.log(e);
    const clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  const layers = document.getElementById("menu");
  layers.appendChild(link);
  
}