import { Switch, Route } from 'react-router';

import { Main } from './routes/Main/Main';

function App() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Main />}></Route>
    </Switch>
  );
}

export default App;
