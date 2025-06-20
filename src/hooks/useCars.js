import { useState } from 'react';
import { fetchCars } from '../services/fetchCars';

export default function useCars() {
  const [cars, setCars] = useState(fetchCars);

  return { cars, setCars };
};
