import { styled, Container, Stack, Button } from '@mui/material';
import useAppContext from '../../context';
import { NavLink } from '..';

const Wrapper = styled(Stack)(({ theme }) => ({
  height: '5rem',
  borderBottom: `solid 1px ${theme.palette.neutral.grey.light}`,
  boxShadow: theme.palette.shadow.main,
}));

const Header = () => {
  const { user, login } = useAppContext();

  return (
    <Wrapper justifyContent="center">
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <NavLink href="/">Home</NavLink>
            {user && <NavLink href="/favorites">Favorites</NavLink>}
          </Stack>
          {!user && <Button onClick={login}>Login</Button>}
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Header;
