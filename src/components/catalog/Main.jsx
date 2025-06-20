import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import useCars from '../../hooks/useCars';
import CardLoading from './CardLoading';
import Overlay from '../common/Overlay';
import TitleImage from '../../assets/car.webp'
import SearchIcon from '../../assets/search.webp';
import PlusIcon from '../../assets/add.webp';

export default function Main() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cars, loading, error } = useCars();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    if (!loading && error) {
      setShowOverlay(true);
    }
  }, [loading, error]);

  const filteredCars = cars.filter(car => {
    const name = `${car.brand} ${car.model}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const carElements = filteredCars.map(car => (
    <Card
      key={car.id}
      id={car.id}
      brand={car.brand}
      model={car.model}
      color={car.color}
      price={car.price}
      year={car.year}
      purchaseDate={car.purchaseDate}
      image={car.image}
    />
  ));

  const cardLoadingElements = Array.from({ length: 6 }, (_, index) => (
    <CardLoading key={index} />
  ));

  return (
    <main id='catalog'>
      <section className='section'>
        <div className='title-container'>
          <img className='car' src={TitleImage} alt='mercedes' />
        </div>
      </section>
      <section className='section'>
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
          <img className='icon' src={SearchIcon} alt='Search' />
        </div>
        <div className='car-list'>
          <div className='card-container'>
            <Link to='/create' className='card'>
              <div className='image-container'>
                <img className='plus-image' src={PlusIcon} alt='Add car' />
              </div>
              <div className='details'>
                <p className='detail-item'>Agregar nuevo vehículo</p>
              </div>
            </Link>
          </div>
          {
            loading ? cardLoadingElements
              : error ? undefined
                : carElements && carElements
          }
        </div>
      </section>
      {showOverlay && (
        <Overlay >
          <div className='overlay-content' >
            <h2>Error</h2>
            <p>{error}</p>
            <button className='btn' onClick={() => setShowOverlay(false)}>Cerrar</button>
          </div>
        </Overlay>
      )}
    </main>
  );
}