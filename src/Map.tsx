import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

function Map(props: any) {
  mapboxgl.accessToken = ""; // Replace with your Mapbox access token
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    //console.log("Lat and Long changed:", props.lat, props.long);

    if (!map.current) {
      //console.log("Initializing map...");

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/navigation-night-v1",
        center: [props.long, props.lat],
        zoom: 12,
      });
    } else {
      //console.log("Updating map center...");

      map.current.setCenter([props.long, props.lat]); // Update map center when props change
    }
    marker.current = new mapboxgl.Marker()
      .setLngLat([props.long, props.lat])
      .addTo(map.current);
  }, [props.lat, props.long]); // Add lat and long as dependencies

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}
export default Map;
