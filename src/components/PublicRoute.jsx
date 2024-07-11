import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profileContext';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({ children, ...routeProps }) => {
  const { isloading, profile } = useProfile();
  if (isloading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }
  if (profile && !isloading) {
    return <Redirect to="/"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
