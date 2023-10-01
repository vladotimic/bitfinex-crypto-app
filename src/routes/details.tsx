import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { DetailsTable, Loading } from '../components';
import { ICurrency } from '../types';
import useAppContext from '../context';

interface ITickerDetails {
  last_price: number;
  high: number;
  low: number;
}

const DetailsPage = () => {
  const { user, favorites, addToFavorite, removeFromFavorite } =
    useAppContext();
  const [tableData, setTableData] = useState<ICurrency[] | null>(null);
  const { id } = useParams();
  const data = useFetch<ITickerDetails>(`/pubticker/${id}`);

  const isFavorite = favorites.some((item) => item === id);

  const handleClick = () => {
    if (id) {
      if (!isFavorite) {
        addToFavorite(id);
      } else {
        removeFromFavorite(id);
      }
    }
  };

  useEffect(() => {
    if (id && data) {
      const { last_price: lastPrice, high, low } = data;
      const item = {
        id,
        symbol: id.toUpperCase(),
        lastPrice: +lastPrice,
        dailyHigh: +high,
        dailyLow: +low,
      };
      setTableData([item]);
    }
  }, [id, data]);

  return (
    <>
      {!tableData ? (
        <Loading height="7rem" />
      ) : (
        <Stack spacing={2}>
          <DetailsTable rows={tableData} />
          {user && (
            <Box>
              <Button
                onClick={handleClick}
                color={!isFavorite ? 'primary' : 'error'}
              >
                {!isFavorite ? 'Add To Favorite' : 'Remove From Favorite'}
              </Button>
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export default DetailsPage;
