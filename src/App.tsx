import { Switch, Route } from 'react-router';
import { Home } from './routes/Home/Home';
import './styles/main.scss';

function App() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Home />}></Route>
    </Switch>
  );
}

export default App;
