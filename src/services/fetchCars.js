import chevroletImage from '../assets/chevrolet_silverado.webp';
import fordImage from '../assets/ford_f_150.webp';
import hondaImage from '../assets/honda_crosstour.webp';
import jaguarImage from '../assets/jaguar_f_pace.webp';
import jeepImage from '../assets/jeep_wrangler.webp';
import kiaImage from '../assets/kia_forte.webp';
import porscheImage from '../assets/porsche_718_cayman.webp';
import toyotaImage from '../assets/toyota_camry.webp';

export const fetchCars = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          brand: 'Chevrolet',
          model: 'Silverado',
          color: 'Dark blue',
          price: 43795,
          year: 2023,
          purchaseDate: '2023-01-15',
          image: chevroletImage
        },
        {
          id: 2,
          brand: 'Ford',
          model: 'F-150',
          color: 'White',
          price: 39999,
          year: 2022,
          purchaseDate: '2022-05-10',
          image: fordImage
        },
        {
          id: 3,
          brand: 'Honda',
          model: 'Crosstour',
          color: 'Gray',
          price: 24999,
          year: 2021,
          purchaseDate: '2021-08-22',
          image: hondaImage
        },
        {
          id: 4,
          brand: 'Jaguar',
          model: 'F-Pace',
          color: 'Blue',
          price: 59999,
          year: 2020,
          purchaseDate: '2020-11-30',
          image: jaguarImage
        },
        {
          id: 5,
          brand: 'Jeep',
          model: 'Wrangler',
          color: 'Black',
          price: 49999,
          year: 2019,
          purchaseDate: '2019-03-14',
          image: jeepImage
        },
        {
          id: 6,
          brand: 'Kia',
          model: 'Forte',
          color: 'Blue',
          price: 23999,
          year: 2022,
          purchaseDate: '2022-07-19',
          image: kiaImage
        },
        {
          id: 7,
          brand: 'Porsche',
          model: '718 Cayman',
          color: 'Silver',
          price: 89999,
          year: 2021,
          purchaseDate: '2021-02-28',
          image: porscheImage
        },
        {
          id: 8,
          brand: 'Toyota',
          model: 'Camry',
          color: 'White',
          price: 24999,
          year: 2020,
          purchaseDate: '2020-06-12',
          image: toyotaImage
        }
      ]);
    }, 1000);
  });
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! AQUI VA LA IMPELEMENTACIÓN DEL LISTADO DE VEHÍCULOS (READ)
// export const fetchCars = async () => {
//   const res = await fetch('http://localhost:3000/cars');
//   if (!res.ok) throw new Error('No se pudieron cargar los vehiculos');
//   return await res.json();
// };
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
