import { LatLngExpression } from "leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, Polyline } from "react-leaflet";
import leaflet from "leaflet";
import "./Map.css";
import Settings from "../Settings/Settings";
import { RoutingContext } from "../../context/routeContext";
import Drawer from "../Drawer/Drawer";
import { useVroom } from "./useVroom";
import Loader from "../Loader/Loader"
import { routeDecoder } from "./helpers/routeDecoder";
import routeColors from "./routeColors";
function Map() {
  const mapRef = useRef<leaflet.Map>(null);
  const [position] = useState<LatLngExpression>(
    leaflet.latLng(48.8579, 2.3494)
  );
  const { jobs, vehicles, solution } = useContext(RoutingContext);
  const toLatLng = (location: number[]): leaflet.LatLng => {
    return leaflet.latLng({ lat: location[1], lng: location[0] });
  };
  const {fetchSolution, loading} = useVroom()
  useEffect(() => {
    if (jobs.length > 0) {
      mapRef.current?.setView(toLatLng(jobs[0].location), 13);
    }
  }, [jobs]);

  const flyToLocation = (location: number[] | undefined) => {
    if (!location){
      return
    }
    let latLng = toLatLng(location);
    mapRef.current?.flyTo(latLng, 15);
  };

  const redIcon = new leaflet.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  return (
    <>
      <Settings solver={fetchSolution}/>
      <MapContainer
        center={position}
        scrollWheelZoom={false}
        ref={mapRef}
        zoom={13}
      >
        <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={process.env.REACT_APP_MAP_LINK!!}
          />
          {jobs.map(({ location, description }, index) => (
            <Marker key={index} position={toLatLng(location)}>
              <Popup>{description}</Popup>
            </Marker>
          ))}
          {vehicles.map(({ start, profile, end }, index) => (
            <div key={index}>
              {start && (
                <Marker icon={redIcon} position={toLatLng(start)}>
                  <Popup>Vehicle Start: {profile}</Popup>
                </Marker>
              )}
              {end && (
                <Marker icon={redIcon} position={toLatLng(end)}>
                  <Popup>Vehicle End: {profile}</Popup>
                </Marker>
              )}
            </div>
          ))}
          {solution && solution.routes.length > 0 && (
            solution.routes.map((route, index) => (
              <Polyline key={index} weight={6} color={routeColors[index]} positions={routeDecoder(route.geometry)}/>
            ))
          )}
        </>
      </MapContainer>
      <Drawer flyTo={flyToLocation} />
      <Loader loading={loading} />
    </>
  );
}

export default Map;
