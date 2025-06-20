import { useState, useEffect } from 'react';
import { fetchBrands } from '../services/fetchBrands';

export default function useBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBrands();
      setBrands(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  return { brands, loading, error, refetch: loadBrands };
}
