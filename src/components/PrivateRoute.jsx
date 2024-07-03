import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

const PrivateRoute = ({ children, ...routeProps }) => {
  const profile = true;
  if (!profile) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};
export default PrivateRoute;
