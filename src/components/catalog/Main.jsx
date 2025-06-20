import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import Overlay from '../common/Overlay';
import titleImage from '../../assets/car.webp'
import searchIcon from '../../assets/search.webp';
import plusIcon from '../../assets/add.webp';
import placeholderImage from '../../assets/cars/placeholder.webp';

export default function Main({ cars, setCars }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [carToDelete, setCarToDelete] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setShowOverlay(true);
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;

    setCars(prevCars => prevCars.filter(c => c.id !== carToDelete.id));
    setShowOverlay(false);
    setCarToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowOverlay(false);
    setCarToDelete(null);
  };

  const filteredCars = cars.filter(car => {
    const name = `${car.brand} ${car.model}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const carElements = filteredCars.map(car => (
    <Card
      key={car.id}
      id={car.id}
      brand={car.brand.name}
      model={car.model.name}
      color={car.color.name}
      price={car.price}
      year={car.year}
      purchaseDate={car.purchaseDate}
      image={car.image ? car.image : placeholderImage}
      onDelete={() => handleDeleteClick({ id: car.id, brand: car.brand.name, model: car.model.name })}
    />
  ));

  return (
    <main id='catalog'>
      <section className='section animation-fade-in-translate'>
        <div className='title-container'>
          <img className='car' src={titleImage} alt='mercedes' />
        </div>
      </section>
      <section className='section animation-fade-in-translate'>
        <div className='section-header dark'>
          <h2 className='section-title'>Listado</h2>
        </div>
        <div className='input-container'>
          <input
            className='input'
            id='search'
            type='text'
            autoComplete='off'
            placeholder='Buscar por nombre'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img className='icon' src={searchIcon} alt='Search' />
        </div>
        <div className='car-list'>
          <div className='card-container'>
            <Link to='/create' className='card'>
              <div className='image-container'>
                <img className='plus-image' src={plusIcon} alt='Add car' />
              </div>
              <div className='details'>
                <p className='detail-item'>Agregar nuevo vehículo</p>
              </div>
            </Link>
          </div>
          <AnimatePresence>
            {carElements}
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        {showOverlay && (
          <Overlay>
            <div className='overlay-content'>
              <h2>Confirmar eliminación</h2>
              <p>¿Estás seguro que deseas eliminar el vehículo {carToDelete?.brand} {carToDelete?.model}?</p>
              <div className='options'>
                <button className='btn' onClick={handleConfirmDelete}>Eliminar</button>
                <button className='btn' onClick={handleCancelDelete}>Cancelar</button>
              </div>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </main>
  );
}
