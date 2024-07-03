import 'rsuite/lib/styles/index.less'; // Import the Less file
import './App.css';

import './App.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';

const App = () => {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <Signin />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
