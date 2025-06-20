import Header from '../../components/common/Header';
import Main from '../../components/create/Main';

export default function Create({ setCars }) {
  return (
    <>
      <Header />
      <Main setCars={setCars} />
    </>
  );
}
