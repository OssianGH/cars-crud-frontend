import { useState } from 'react';
import { fetchColors } from '../services/fetchColors';

export default function useColors() {
  const [colors, setColors] = useState(fetchColors);

  return { colors, setColors };
};
