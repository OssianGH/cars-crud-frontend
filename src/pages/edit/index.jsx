import Header from '../../components/common/Header';
import Main from '../../components/edit/Main';

export default function Edit({ cars, setCars }) {
  return (
    <>
      <Header />
      <Main cars={cars} setCars={setCars} />
    </>
  );
}
