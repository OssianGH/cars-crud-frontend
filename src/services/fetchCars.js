import chevroletImage from '../assets/cars/chevrolet_silverado.webp';
import fordImage from '../assets/cars/ford_f_150.webp';
import hondaImage from '../assets/cars/honda_crosstour.webp';
import jaguarImage from '../assets/cars/jaguar_f_pace.webp';
import jeepImage from '../assets/cars/jeep_wrangler.webp';
import kiaImage from '../assets/cars/kia_forte.webp';
import porscheImage from '../assets/cars/porsche_718_cayman.webp';
import toyotaImage from '../assets/cars/toyota_camry.webp';

export const fetchCars = () => [
  {
    id: 1,
    brand: { id: 1, name: 'Chevrolet' },
    model: { id: 1, name: 'Silverado' },
    color: { id: 1, name: 'Dark blue' },
    price: 43795,
    year: 2023,
    purchaseDate: '2023-01-15',
    image: chevroletImage
  },
  {
    id: 2,
    brand: { id: 2, name: 'Ford' },
    model: { id: 1, name: 'F-150' },
    color: { id: 2, name: 'White' },
    price: 39999,
    year: 2022,
    purchaseDate: '2022-05-10',
    image: fordImage
  },
  {
    id: 3,
    brand: { id: 3, name: 'Honda' },
    model: { id: 1, name: 'Crosstour' },
    color: { id: 3, name: 'Gray' },
    price: 24999,
    year: 2021,
    purchaseDate: '2021-08-22',
    image: hondaImage
  },
  {
    id: 4,
    brand: { id: 4, name: 'Jaguar' },
    model: { id: 1, name: 'F-Pace' },
    color: { id: 4, name: 'Blue' },
    price: 59999,
    year: 2020,
    purchaseDate: '2020-11-30',
    image: jaguarImage
  },
  {
    id: 5,
    brand: { id: 5, name: 'Jeep' },
    model: { id: 1, name: 'Wrangler' },
    color: { id: 5, name: 'Black' },
    price: 49999,
    year: 2019,
    purchaseDate: '2019-03-14',
    image: jeepImage
  },
  {
    id: 6,
    brand: { id: 6, name: 'Kia' },
    model: { id: 1, name: 'Forte' },
    color: { id: 4, name: 'Blue' },
    price: 23999,
    year: 2022,
    purchaseDate: '2022-07-19',
    image: kiaImage
  },
  {
    id: 7,
    brand: { id: 7, name: 'Porsche' },
    model: { id: 1, name: '718 Cayman' },
    color: { id: 6, name: 'Silver' },
    price: 89999,
    year: 2021,
    purchaseDate: '2021-02-28',
    image: porscheImage
  },
  {
    id: 8,
    brand: { id: 8, name: 'Toyota' },
    model: { id: 1, name: 'Camry' },
    color: { id: 2, name: 'White' },
    price: 24999,
    year: 2020,
    purchaseDate: '2020-06-12',
    image: toyotaImage
  }
];
