import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import parser from 'html-react-parser'

interface MarkerData {
  position: [number, number];
  popupText: string;
}

interface MapWithMarkersProps {
  markers: MarkerData[];
}

const MapWithMarkers: React.FC<MapWithMarkersProps> = ({ markers }) => {
    useEffect(() => {
        const defaultMarker = new L.Icon({
            iconUrl: icon.src,
            shadowUrl: iconShadow.src,
        });
        L.Marker.prototype.options.icon = defaultMarker;
    }, [])
    
  return (
    <MapContainer center={markers[0].position} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker position={marker.position} key={index}>
          <Popup>{parser(marker.popupText)}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarkers;
