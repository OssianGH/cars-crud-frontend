import { useState, useEffect } from 'react';
import { fetchColors } from '../services/fetchColors';

export default function useColors() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadColors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchColors();
      setColors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColors();
  }, []);

  return { colors, loading, error, refetch: loadColors };
}
