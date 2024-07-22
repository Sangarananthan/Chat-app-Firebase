import { Switch } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import Signin from './pages/Signin';
import Home from './pages/home/index';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ProfileProvider from './context/profileContext';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
