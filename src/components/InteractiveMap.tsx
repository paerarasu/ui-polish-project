import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import { Property } from "./PropertyDetailsModal";
import "mapbox-gl/dist/mapbox-gl.css";

interface InteractiveMapProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  mapboxToken: string;
}

export const InteractiveMap = ({ properties, onPropertyClick, mapboxToken }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.2090, 28.6139],
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each property
    properties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.innerHTML = `
        <div class="group relative cursor-pointer transition-transform hover:scale-110">
          <svg class="h-8 w-8 text-secondary drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div class="marker-tooltip absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold whitespace-nowrap border border-border/50">
            ₹${property.rent.toLocaleString()}
          </div>
        </div>
      `;
      
      el.addEventListener('click', () => {
        onPropertyClick(property);
      });

      new mapboxgl.Marker(el)
        .setLngLat([property.longitude, property.latitude])
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, properties, onPropertyClick]);

  if (!mapboxToken) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl bg-muted/50">
        <div className="text-center">
          <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <p className="text-lg font-semibold text-muted-foreground">Enter Mapbox Token</p>
          <p className="text-sm text-muted-foreground">Please enter your Mapbox token above to view the map</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full rounded-xl" />;
};
