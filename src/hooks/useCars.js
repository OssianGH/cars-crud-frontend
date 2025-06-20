import { useState, useEffect } from 'react';
import { fetchCars } from '../services/fetchCars';

export default function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCars();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return { cars, loading, error, refetch: loadCars };
};
