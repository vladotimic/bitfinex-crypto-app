import { styled, Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
}));

const ErrorPage = () => {
  return (
    <Wrapper>
      <Stack alignItems="center" spacing={3}>
        <Typography variant="h2">Not Found</Typography>
        <Link to="/">Go To Home Page</Link>
      </Stack>
    </Wrapper>
  );
};

export default ErrorPage;
