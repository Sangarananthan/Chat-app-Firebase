import { Switch, Route } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import Signin from './pages/Signin';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import Privateroute from './components/PrivateRoute';

function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <Signin />
      </PublicRoute>
      <Privateroute path="/">
        <Home />
      </Privateroute>
    </Switch>
  );
}

export default App;
