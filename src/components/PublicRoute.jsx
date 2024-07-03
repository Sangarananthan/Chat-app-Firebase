import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = true;

  if (profile) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
