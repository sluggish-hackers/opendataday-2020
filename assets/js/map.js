mapboxgl.accessToken =
  "pk.eyJ1Ijoib2tmbiIsImEiOiJjaXlrOW5yczgwMDEzMnlwaWd2ZzF6MDQ3In0.2UJlkR69zbu4-3YRJJgN5w";

var clusterRadius = 50,
  clusterMaxZoom = 14; // Max zoom to cluster points on

var lngLat = [126.978627, 37.551657];

var map = new mapboxgl.Map({
  container: "map-container",
  style: "mapbox://styles/mapbox/bright-v9",
  center: lngLat,
  zoom: 16,
  minZoom: 10,
  scrollZoom: false
});

var marker = new mapboxgl.Marker();
var markerHeight = 50,
  markerRadius = 10,
  linearOffset = 25;

var popupOffsets = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [
    linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1
  ],
  "bottom-right": [
    -linearOffset,
    (markerHeight - markerRadius + linearOffset) * -1
  ],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1]
};

var popup = new mapboxgl.Popup({ offset: popupOffsets, className: "my-class" })
  .setLngLat(lngLat)
  .setHTML(
    '<h5>서울 눅스, Seoul Nooks!</h5><p>서울특별시 용산구 후암로 34길 31</p><p><a href="http://naver.me/5svNk1MM" target="_blank">네이버맵</a> | <a href="http://kko.to/ZV0XxXG0B" target="_blank">카카오맵</a></p>'
  )
  .addTo(map);

var marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);

map.addControl(new mapboxgl.NavigationControl(), "top-left");

function pointsToBounds(points) {
  return points.reduce(function(bounds, point) {
    return bounds.extend(point.geometry.coordinates);
  }, new mapboxgl.LngLatBounds(
    points[0].geometry.coordinates,
    points[0].geometry.coordinates
  ));
}
