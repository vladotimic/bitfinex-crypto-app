import { Outlet } from 'react-router-dom';
import { styled, Stack, Container } from '@mui/material';
import { Header } from '../components';

const Content = styled(Stack)(() => ({
  width: '100%',
  marginTop: '3rem',
}));

const Root = () => {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Outlet />
        </Content>
      </Container>
    </>
  );
};

export default Root;
