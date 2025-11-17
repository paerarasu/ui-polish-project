import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { Home } from 'lucide-react';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
}

function MapUpdater({ properties }: { properties: Property[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map(p => [p.latitude, p.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);

  return null;
}

export const PropertyMap = ({ properties, selectedProperty }: PropertyMapProps) => {
  const center: [number, number] = [28.6139, 77.2090]; // Delhi center

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater properties={properties} />
        {properties.map((property, index) => (
          <Marker
            key={index}
            position={[property.latitude, property.longitude]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  {property.title}
                </h3>
                <div className="space-y-1 text-xs">
                  <p><strong>Price:</strong> ₹{property.price.toLocaleString()}/month</p>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Area:</strong> {property.area_sqft} sq.ft</p>
                  <p><strong>Furnishing:</strong> {property.furnishing}</p>
                  <p><strong>Price/sq.ft:</strong> ₹{property.price_per_sqft}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
