import { HighlightTable, Loading } from '../components';
import useAppContext from '../context';

const HomePage = () => {
  const { currencies, isLoading } = useAppContext();

  return currencies.length !== 5 || isLoading ? (
    <Loading height="20rem" />
  ) : (
    <HighlightTable rows={currencies} />
  );
};

export default HomePage;
