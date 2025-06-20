import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/catalog';
import Create from './pages/create';
import Edit from './pages/edit';
import useCars from './hooks/useCars';

export default function App() {
  const { cars, setCars } = useCars();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Catalog cars={cars} setCars={setCars} />} />
        <Route path='/create' element={<Create setCars={setCars} />} />
        <Route path='/edit/:id' element={<Edit cars={cars} setCars={setCars} />} />
      </Routes>
    </BrowserRouter>
  )
}
