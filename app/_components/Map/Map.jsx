import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles/index.css";

const Map = ({position}) => {
  // const position = [51.505, -0.09];
  const customMarkerIcon = L.divIcon({
    className: "marker-shelter",
    iconSize: [20, 20], // Defina o tamanho do ícone aqui, se necessário
  });

  return (
    <div className="container-map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarkerIcon}>
          <Popup>A custom marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;