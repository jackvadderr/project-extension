'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Icon } from 'leaflet';

// Dynamically import map components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

export default function MapaComEndereco() {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [icon, setIcon] = useState<Icon | null>(null);

  useEffect(() => {
    // Initialize leaflet and its CSS
    import('leaflet/dist/leaflet.css');
    import('leaflet').then((L) => {
      setIcon(
        L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    });

    // Fetch coordinates
    const fetchCoords = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=R.%20Nicarágua,%201226%20-%20Nova%20Porto%20Velho,%20Porto%20Velho%20-%20RO,%2076820-830&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    };

    fetchCoords();
  }, []);

  const handleClick = () => {
    window.open('https://maps.app.goo.gl/JEFsHWWEjUbRWZL6A', '_blank');
  };

  return (
    <div className="flex justify-center items-center w-full pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01]">
        <div
          className="px-6 py-4 border-b border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold text-gray-700">Localização</h2>
          <p className="text-sm text-gray-500">R. Nicarágua, 1226 - Porto Velho, RO</p>
        </div>
        <div className="h-[400px] w-full">
          {coords && icon ? (
            <MapContainer center={coords} zoom={16} className="w-full h-full z-0">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={coords} icon={icon} />
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              Carregando mapa...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}