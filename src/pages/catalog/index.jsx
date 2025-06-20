import Main from '../../components/catalog/Main';
import Header from '../../components/common/Header';

export default function Catalog({ cars, setCars }) {
  return (
    <>
      <Header />
      <Main cars={cars} setCars={setCars} />
    </>
  );
}
