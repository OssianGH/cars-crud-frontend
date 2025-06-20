export const fetchBrands = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Chevrolet',
          models: [
            { id: 1, name: 'Silverado' },
            { id: 2, name: 'Malibu' },
            { id: 3, name: 'Equinox' }
          ]
        },
        {
          id: 2,
          name: 'Ford',
          models: [
            { id: 1, name: 'F-150' },
            { id: 2, name: 'Mustang' },
            { id: 3, name: 'Escape' }
          ]
        },
        {
          id: 3,
          name: 'Honda',
          models: [
            { id: 1, name: 'Crosstour' },
            { id: 2, name: 'Civic' },
            { id: 3, name: 'Accord' }
          ]
        },
        {
          id: 4,
          name: 'Jaguar',
          models: [
            { id: 1, name: 'F-Pace' },
            { id: 2, name: 'XE' },
            { id: 3, name: 'XF' }
          ]
        },
        {
          id: 5,
          name: 'Jeep',
          models: [
            { id: 1, name: 'Wrangler' },
            { id: 2, name: 'Cherokee' },
            { id: 3, name: 'Compass' }
          ]
        },
        {
          id: 6,
          name: 'Kia',
          models: [
            { id: 1, name: 'Forte' },
            { id: 2, name: 'Sorento' },
            { id: 3, name: 'Sportage' }
          ]
        },
        {
          id: 7,
          name: 'Porsche',
          models: [
            { id: 1, name: '718 Cayman' },
            { id: 2, name: '911' },
            { id: 3, name: 'Macan' }
          ]
        },
        {
          id: 8,
          name: 'Toyota',
          models: [
            { id: 1, name: 'Camry' },
            { id: 2, name: 'Corolla' },
            { id: 3, name: 'RAV4' }
          ]
        }
      ]);
    }, 1000);
  });
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! AQUI VA LA IMPELEMENTACIÓN DEL LISTADO DE MARCAS
// export const fetchBrands = async () => {
//   const res = await fetch('http://localhost:3000/brands');
//   if (!res.ok) throw new Error('No se pudieron cargar las marcas');
//   return await res.json();
// };
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
