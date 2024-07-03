import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profileContext';
const Privateroute = ({ children, ...routeProps }) => {
  const profile = useProfile();
  if (!profile) {
    return <Redirect to="/signin"></Redirect>;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Privateroute;
