import { Temporal } from '@js-temporal/polyfill'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useBrands from '../../hooks/useBrands';
import useColors from '../../hooks/useColors';
import Input from '../common/Input';
import Select from '../common/Select';
import BookmarkIcon from '../../assets/bookmark.webp';
import KeyIcon from '../../assets/key.webp';
import ColorPaletteIcon from '../../assets/color-palette.webp';
import MoneyBagIcon from '../../assets/money-bag.webp';
import PictureIcon from '../../assets/picture.webp';
import HashIcon from '../../assets/hash.webp';
import PlaceholderImage from '../../assets/placeholder.webp';

export default function Main() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { brands, loading: brandsLoading } = useBrands();
  const { colors, loading: colorsLoading } = useColors();

  const models = selectedBrand
    ? (brands.find(b => b.id === Number(selectedBrand))?.models || [])
    : [];

  const setError = (name, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
    if (id === 'brand') {
      setSelectedBrand(value);
      setSelectedModel('');
    }
    if (id === 'model') {
      setSelectedModel(value);
    }
    if (id === 'color') {
      setSelectedColor(value);
    }
    if (id === 'image') {
      setSelectedImage(files[0]);
    }
  };

  const validateData = (data) => {
    let {
      brand,
      model,
      color,
      purchaseDate,
      image,
      price,
      year
    } = data;
    let valid = true;

    if (!brand) {
      setError('brand', 'No ha ingresado una marca.');
      valid = false;
    }
    brand = Number(brand);

    if (!model) {
      setError('model', 'No ha ingresado un modelo.');
      valid = false;
    }
    model = Number(model);

    if (!color) {
      setError('color', 'No ha ingresado un color.');
      valid = false;
    }
    color = Number(color);

    if (!price) {
      setError('price', 'No ha ingresado el precio del vehículo.');
      valid = false;
    } else if (isNaN(price) || Number(price) <= 0) {
      setError('price', 'Precio inválido.');
      valid = false;
    }
    price = Number(price);

    if (!year) {
      setError('year', 'No ha ingresado el año del vehículo.');
      valid = false;
    } else if (isNaN(year) || Number(year) < 1886) {
      setError('year', `Año del vehículo inválido.`);
      valid = false;
    }
    year = Number(year);

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

    if (!image.name) {
      setError('image', 'No ha ingresado una foto del vehículo.');
      valid = false;
    } else if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
      setError('image', 'La foto debe ser un archivo JPG o PNG.');
      valid = false;
    }

    return valid ? {
      brand,
      model,
      color,
      price,
      year,
      purchaseDate,
      image
    } : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      brand: formData.get('brand') || '',
      model: formData.get('model') || '',
      color: formData.get('color') || '',
      price: formData.get('price') || '',
      year: formData.get('year') || '',
      purchaseDate: formData.get('purchaseDate') || '',
      image: formData.get('image') || '',
    };

    const validData = validateData(data);
    if (!validData) return;

    postData(validData);
  };

  const postData = (data) => {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //! AQUI VA LA IMPELEMENTACIÓN DE AGREGAR VEHÍCULO (CREATE)
    // fetch('http://localhost:3000/create', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error al crear el vehículo');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Vehículo creado:', data);
    //     navigate('/');
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     setError('form', 'Error al crear el vehículo. Inténtelo de nuevo.');
    //   });
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(data);
  }

  return (
    <main id='create'>
      <div className='image-container'>
        <img
          src={
            selectedImage ? URL.createObjectURL(selectedImage) : PlaceholderImage
          }
          alt='Car image' />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <Select
          id='brand'
          label='Marca'
          options={brandsLoading ? [] : brands.map(b => ({ value: b.id, label: b.name }))}
          handleChange={handleChange}
          error={errors.brand}
          icon={BookmarkIcon}
          value={selectedBrand}
          disabled={brandsLoading}
        />
        <Select
          id='model'
          label='Modelo'
          options={selectedBrand && !brandsLoading ? models.map(m => ({ value: m.id, label: m.name })) : []}
          handleChange={handleChange}
          error={errors.model}
          icon={KeyIcon}
          value={selectedModel}
          disabled={!selectedBrand || brandsLoading}
        />
        <Select
          id='color'
          label='Color'
          options={colorsLoading ? [] : colors.map(c => ({ value: c.id, label: c.name }))}
          handleChange={handleChange}
          error={errors.color}
          icon={ColorPaletteIcon}
          value={selectedColor}
          disabled={colorsLoading}
        />
        <Input
          id='price'
          type='number'
          label='Precio'
          handleChange={handleChange}
          error={errors.price}
          icon={MoneyBagIcon}
        />
        <Input
          id='year'
          type='number'
          label='Año'
          handleChange={handleChange}
          error={errors.year}
          icon={HashIcon}
        />
        <Input
          id='purchaseDate'
          type='date'
          label='Fecha de compra'
          handleChange={handleChange}
          error={errors.purchaseDate}
        />
        <Input
          id='image'
          type='file'
          handleChange={handleChange}
          error={errors.image}
          icon={PictureIcon}
        />
        <div className='options'>
          <button className='btn full-width'>Agregar vehículo</button>
          <Link to='/' className='btn full-width'>Volver al inicio</Link>
        </div>
      </form>
    </main >
  );
};
