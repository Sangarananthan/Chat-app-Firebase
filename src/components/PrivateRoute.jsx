import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
const Privateroute = ({ children, ...routeProps }) => {
  const profile = false;
  if (!profile) {
    return <Redirect to="/signin"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Privateroute;
