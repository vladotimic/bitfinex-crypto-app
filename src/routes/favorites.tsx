import { Typography } from '@mui/material';
import { HighlightTable, Loading } from '../components';
import useAppContext from '../context';

const FavoritesPage = () => {
  const { currencies, favorites, isLoading } = useAppContext();

  const rows = currencies.filter((item) => favorites.includes(item.id));

  if (favorites.length === 0) {
    return (
      <Typography variant="h5">
        You don't have any crypto in your favorites!
      </Typography>
    );
  }

  return currencies.length !== 5 || isLoading ? (
    <Loading height="20rem" />
  ) : (
    <HighlightTable rows={rows} />
  );
};

export default FavoritesPage;
