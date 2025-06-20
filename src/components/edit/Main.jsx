import { Temporal } from '@js-temporal/polyfill'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useBrands from '../../hooks/useBrands';
import useColors from '../../hooks/useColors';
import Input from '../common/Input';
import Select from '../common/Select';
import bookmarkIcon from '../../assets/bookmark.webp';
import keyIcon from '../../assets/key.webp';
import colorPaletteIcon from '../../assets/color-palette.webp';
import moneyBagIcon from '../../assets/money-bag.webp';
import hashIcon from '../../assets/hash.webp';
import placeholderImage from '../../assets/cars/placeholder.webp';

export default function Main({ cars, setCars }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { brands } = useBrands();
  const { colors } = useColors();
  const [errors, setErrors] = useState({});
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    price: '',
    year: '',
    purchaseDate: '',
    image: ''
  });

  const models = car.brand ?
    brands.find(b => b.id == car.brand)?.models || []
    : [];

  const brandOptions = brands.map(b => ({
    value: b.id,
    label: b.name
  }));

  const modelOptions = models.map(m => ({
    value: m.id,
    label: m.name
  }));

  const colorOptions = colors.map(c => ({
    value: c.id,
    label: c.name
  }));

  useEffect(() => {
    const foundCar = cars.find(car => car.id == id);
    if (foundCar) {
      setCar({
        brand: foundCar.brand.id,
        model: foundCar.model.id,
        color: foundCar.color.id,
        price: foundCar.price,
        year: foundCar.year?.toString(),
        purchaseDate: foundCar.purchaseDate,
        image: foundCar.image
      });
    }
  }, []);

  const setError = (name, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const handleChange = ({ target: { name, value } }) => {
    // Limpiar error al cambiar el valor del campo
    setError(name, '');

    // Actualizar el estado del coche
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
      ...(name === 'brand' ? { model: '' } : {}),
    }));
  };

  const validateData = () => {
    let {
      brand,
      model,
      color,
      price,
      year,
      purchaseDate,
    } = car;
    let valid = true;

    if (!brand) {
      setError('brand', 'No ha ingresado una marca.');
      valid = false;
    }

    if (!model) {
      setError('model', 'No ha ingresado un modelo.');
      valid = false;
    }

    if (!color) {
      setError('color', 'No ha ingresado un color.');
      valid = false;
    }

    if (!price) {
      setError('price', 'No ha ingresado el precio del vehículo.');
      valid = false;
    } else if (isNaN(price) || Number(price) <= 0) {
      setError('price', 'Precio inválido.');
      valid = false;
    }

    if (!year) {
      setError('year', 'No ha ingresado el año del vehículo.');
      valid = false;
    } else if (isNaN(year) || Number(year) < 1886) {
      setError('year', `Año del vehículo inválido.`);
      valid = false;
    }

    try {
      const date = Temporal.PlainDate.from(purchaseDate);
      const today = Temporal.Now.plainDateISO();
      const minDate = Temporal.PlainDate.from({ year: 1900, month: 1, day: 1 });
      if (
        Temporal.PlainDate.compare(date, today) === 1 ||
        Temporal.PlainDate.compare(date, minDate) === -1
      ) {
        setError('purchaseDate', 'Fecha de compra inválida.')
        valid = false
      }
    } catch {
      setError('purchaseDate', 'Fecha de compra inválida.')
      valid = false
    }

    const brandObj = brands.find(b => b.id == car.brand);

    return valid ? {
      id: Date.now(),
      brand: { id: brandObj.id, name: brandObj.name },
      model: brandObj.models.find(m => m.id == car.model),
      color: colors.find(c => c.id == car.color),
      price: Number(price),
      year: Number(year),
      purchaseDate: Temporal.PlainDate.from(purchaseDate).toString(),
      image: car.image || placeholderImage
    } : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validData = validateData();
    if (!validData) return;

    postData(validData);
  };

  const postData = (body) => {
    setCars(prev =>
      prev.map(car => car.id == id ? body : car)
    );
    navigate('/');
  };

  return (
    <main id='create' className='animation-fade-in-translate'>
      <div className='image-container'>
        <img
          src={car.image || placeholderImage}
          alt='Car image' />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <Select
          id='brand'
          label='Marca'
          options={brandOptions}
          value={car.brand}
          error={errors.brand}
          icon={bookmarkIcon}
          handleChange={handleChange}
        />
        <Select
          id='model'
          label='Modelo'
          options={modelOptions}
          value={car.model}
          error={errors.model}
          icon={keyIcon}
          handleChange={handleChange}
        />
        <Select
          id='color'
          label='Color'
          options={colorOptions}
          value={car.color}
          error={errors.color}
          icon={colorPaletteIcon}
          handleChange={handleChange}
        />
        <Input
          id='price'
          label='Precio'
          type='number'
          value={car.price}
          error={errors.price}
          icon={moneyBagIcon}
          handleChange={handleChange}
        />
        <Input
          id='year'
          label='Año'
          type='number'
          value={car.year}
          error={errors.year}
          icon={hashIcon}
          handleChange={handleChange}
        />
        <Input
          id='purchaseDate'
          type='date'
          value={car.purchaseDate}
          error={errors.purchaseDate}
          handleChange={handleChange}
        />
        <div className='options'>
          <button className='btn full-width'>Guardar cambios</button>
          <Link to='/' className='btn full-width'>Volver al inicio</Link>
        </div>
      </form>
    </main >
  );
};
