import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profileContext';
import { Container, Loader } from 'rsuite';
const Privateroute = ({ children, ...routeProps }) => {
  const { isloading, profile } = useProfile();
  if (isloading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }
  if (!profile && !isloading) {
    return <Redirect to="/signin"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Privateroute;
