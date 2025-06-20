import { Temporal } from '@js-temporal/polyfill';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useBrands from '../../hooks/useBrands';
import useColors from '../../hooks/useColors';
import useCars from '../../hooks/useCars';
import Input from '../common/Input';
import Select from '../common/Select';
import BookmarkIcon from '../../assets/bookmark.webp';
import KeyIcon from '../../assets/key.webp';
import ColorPaletteIcon from '../../assets/color-palette.webp';
import MoneyBagIcon from '../../assets/money-bag.webp';
import PictureIcon from '../../assets/picture.webp';
import HashIcon from '../../assets/hash.webp';
import Overlay from '../common/Overlay';

export default function Main() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [formValues, setFormValues] = useState(null);
  const { brands, loading: brandsLoading } = useBrands();
  const { colors, loading: colorsLoading } = useColors();
  const { cars, loading: carsLoading } = useCars();

  useEffect(() => {
    if (!carsLoading && id && brands.length && colors.length) {
      const car = cars.find(c => String(c.id) === String(id));
      if (car) {
        const brandObj = brands.find(b => b.name === car.brand);
        const colorObj = colors.find(c2 => c2.name === car.color);
        setSelectedBrand(brandObj ? brandObj.id : '');
        setSelectedModel(brandObj ? (brandObj.models.find(m => m.name === car.model)?.id || '') : '');
        setSelectedColor(colorObj ? colorObj.id : '');
        setFormValues({
          brand: brandObj ? brandObj.id : '',
          model: brandObj ? (brandObj.models.find(m => m.name === car.model)?.id || '') : '',
          color: colorObj ? colorObj.id : '',
          price: car.price,
          year: car.year,
          purchaseDate: car.purchaseDate,
          image: car.image
        });
      }
    }
  }, [cars, carsLoading, brands, colors, id]);

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
      setFormValues(fv => ({ ...fv, brand: value, model: '' }));
    }
    if (id === 'model') {
      setSelectedModel(value);
      setFormValues(fv => ({ ...fv, model: value }));
    }
    if (id === 'color') {
      setSelectedColor(value);
      setFormValues(fv => ({ ...fv, color: value }));
    }
    if (id === 'image') {
      setFormValues(fv => ({ ...fv, image: files[0] }));
    } else {
      setFormValues(fv => ({ ...fv, [id]: value }));
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

    if (!image) {
      setError('image', 'No ha ingresado una foto del vehículo.');
      valid = false;
    } else if (image.name && image.type !== 'image/jpeg' && image.type !== 'image/png') {
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
      image: formValues?.image || formData.get('image') || '',
    };

    const validData = validateData(data);
    if (!validData) return;

    postData({ id: Number(id), ...validData });
  };

  const postData = (data) => {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //! AQUI VA LA IMPELEMENTACIÓN DE EDITAR VEHÍCULO (UPDATE)
    // fetch(`http://localhost:3000/update/${id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error al actualizar el vehículo');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Vehículo actualizado:', data);
    //     navigate('/');
    //   })
    //   .catch(error => {
    //     console.error('Error al actualizar el vehículo:', error);
    //     setError('form', 'Error al actualizar el vehículo. Por favor, inténtelo de nuevo más tarde.');
    //   });
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(data);
  };

  if (carsLoading || brandsLoading || colorsLoading || !formValues) {
    return (
      <Overlay>
        <div className='three-body'>
          <div className='three-body__dot'></div>
          <div className='three-body__dot'></div>
          <div className='three-body__dot'></div>
        </div>
      </Overlay>
    );
  }

  return (
    <main id='create'>
      <div className='image-container'>
        <img src={typeof formValues.image === 'string' ? formValues.image : URL.createObjectURL(formValues.image)} alt='Car image' />
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
          value={formValues.price}
        />
        <Input
          id='year'
          type='number'
          label='Año'
          handleChange={handleChange}
          error={errors.year}
          icon={HashIcon}
          value={formValues.year}
        />
        <Input
          id='purchaseDate'
          type='date'
          label='Fecha de compra'
          handleChange={handleChange}
          error={errors.purchaseDate}
          value={formValues.purchaseDate}
        />
        <Input
          id='image'
          type='file'
          handleChange={handleChange}
          error={errors.image}
          icon={PictureIcon}
        />
        <div className='options'>
          <button className='btn full-width'>Guardar cambios</button>
          <Link to='/' className='btn full-width'>Volver al inicio</Link>
        </div>
      </form>
    </main>
  );
}
