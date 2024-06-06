"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON=icon({
  iconUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize:[25,41],
})
export default function Map({ locationValue }: { locationValue: string }) {

  const { getCountryByValue } = useCountries();
  const latlan = getCountryByValue(locationValue)?.latLang;

  return (
    <MapContainer
      center={latlan ?? [51.505, -0.09]}
      zoom={7}
      className="h-[50vh] rounded-lg relative z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latlan ?? [51.505, -0.09]} icon={ICON} />
    </MapContainer>
  );
}
