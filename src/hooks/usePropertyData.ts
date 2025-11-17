import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Property } from '@/types/property';

export const usePropertyData = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/delhi_rentals.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data as Property[];
            setProperties(parsedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to load property data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { properties, loading, error };
};
