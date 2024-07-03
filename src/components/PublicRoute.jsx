import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profileContext';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = useProfile();

  if (profile) {
    return <Redirect to="/"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
