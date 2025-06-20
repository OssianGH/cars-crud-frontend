export const fetchColors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Dark blue' },
        { id: 2, name: 'White' },
        { id: 3, name: 'Gray' },
        { id: 4, name: 'Blue' },
        { id: 5, name: 'Black' },
        { id: 6, name: 'Silver' },
        { id: 7, name: 'Red' },
        { id: 8, name: 'Green' },
      ]);
    }, 500);
  });
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//! AQUI VA LA IMPELEMENTACIÓN DEL LISTADO DE COLORES
// export const fetchColors = async () => {
//   const res = await fetch('http://localhost:3000/colors');
//   if (!res.ok) throw new Error('No se pudieron cargar los colores');
//   return await res.json();
// };
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
