import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bhk: number;
  area_sqft: number;
  furnishing: string;
  latitude: number;
  longitude: number;
}

interface MapboxMapProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
}

const MapboxMap = ({ properties, onPropertyClick }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [tempKey, setTempKey] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [77.2090, 28.6139], // Delhi coordinates
        zoom: 11,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapReady(true);
      });
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  };

  useEffect(() => {
    if (apiKey && !map.current) {
      initializeMap(apiKey);
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [apiKey]);

  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add heatmap layer
    if (map.current.getLayer('properties-heat')) {
      map.current.removeLayer('properties-heat');
    }
    if (map.current.getSource('properties')) {
      map.current.removeSource('properties');
    }

    // Create GeoJSON data for heatmap
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: properties.map(prop => ({
        type: 'Feature' as const,
        properties: {
          price: prop.price,
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [prop.longitude, prop.latitude],
        },
      })),
    };

    // Add heatmap source and layer
    map.current.addSource('properties', {
      type: 'geojson',
      data: geojsonData,
    });

    map.current.addLayer({
      id: 'properties-heat',
      type: 'heatmap',
      source: 'properties',
      maxzoom: 15,
      paint: {
        'heatmap-weight': ['interpolate', ['linear'], ['get', 'price'], 0, 0, 100000, 1],
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)',
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 20],
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.8, 15, 0.4],
      },
    });

    // Add markers for individual properties
    properties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.cursor = 'pointer';
      
      // Price-based color coding
      const priceColor = property.price > 60000 ? '#ef4444' : 
                         property.price > 40000 ? '#f59e0b' : 
                         property.price > 20000 ? '#10b981' : '#3b82f6';
      
      el.innerHTML = `
        <div style="
          background-color: ${priceColor};
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          color: white;
        ">
          ${property.bhk}
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.longitude, property.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color: #000; padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${property.title}</h3>
              <p style="margin: 2px 0;"><strong>₹${property.price.toLocaleString()}</strong>/month</p>
              <p style="margin: 2px 0;">${property.bhk} BHK • ${property.area_sqft} sqft</p>
              <p style="margin: 2px 0;">${property.location}</p>
              <p style="margin: 2px 0; font-size: 12px; color: #666;">${property.furnishing}</p>
            </div>
          `)
        )
        .addTo(map.current!);

      el.addEventListener('click', () => {
        if (onPropertyClick) {
          onPropertyClick(property);
        }
      });

      markers.current.push(marker);
    });

    // Fit map to show all markers
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(prop => {
        bounds.extend([prop.longitude, prop.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 13 });
    }
  }, [properties, isMapReady, onPropertyClick]);

  if (!apiKey) {
    return (
      <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center rounded-lg border border-border/50 bg-card/60 p-8 backdrop-blur-xl">
        <MapPin className="mb-4 h-16 w-16 text-secondary" />
        <h3 className="mb-2 text-xl font-bold text-foreground">Enter Mapbox API Key</h3>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Get your free API key from{' '}
          <a 
            href="https://account.mapbox.com/access-tokens/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex w-full max-w-md gap-2">
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="border-border/50 bg-muted"
          />
          <Button 
            onClick={() => setApiKey(tempKey)}
            disabled={!tempKey}
            className="bg-secondary hover:bg-secondary/90"
          >
            Load Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[500px] w-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute bottom-4 left-4 rounded-lg border border-border/50 bg-card/90 p-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>₹0-20k</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span>₹20-40k</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span>₹40-60k</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span>₹60k+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxMap;
