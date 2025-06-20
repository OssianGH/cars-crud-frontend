import { useState } from 'react';
import { fetchBrands } from '../services/fetchBrands';

export default function useBrands() {
  const [brands, setBrands] = useState(fetchBrands);

  return { brands, setBrands };
};
