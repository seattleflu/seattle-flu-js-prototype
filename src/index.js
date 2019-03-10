import "./main.scss";
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import config from './config';

import mapData from "./mapData/2016_seattle_cra.json";


const mapboxToken = config.mapboxToken;
mapboxgl.accessToken = mapboxToken;

let app = document.querySelector('#app')


const map = new mapboxgl.Map({
  container: 'app',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-122.32, 47.60],
  zoom: 10,
});

map.on("load", function() {
  map.addSource(
    'cra',
    { type: 'geojson', data: mapData },
    )

  map.addLayer({
    "id": "cra-join",
    "type": "fill",
    "source": "cra",
    "paint": {
      "fill-color": "#00aa99",
      "fill-outline-color": "white"
    }
  }, 'waterway-label');
})
