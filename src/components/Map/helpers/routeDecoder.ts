import polyline from '@mapbox/polyline';
import leaflet from 'leaflet';

export const routeDecoder =(geometry: string) => {
 const decodedRoute =  polyline.decode(geometry)
 const routeCoords = decodedRoute.map(coord => leaflet.latLng([coord[0], coord[1]]));
 return routeCoords
}
