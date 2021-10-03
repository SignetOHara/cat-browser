import { useState, useReducer } from 'react';
import { Switch, Route } from 'react-router';
import { Home } from './routes/Home/Home';
import { reducer } from './reducers/reducers';
import { CatPage } from './routes/CatPage/CatPage';
import { Cat } from './types/Cat';
import { Breed } from './types/Breed';
import './styles/main.scss';

const initialState = {
  loading: true,
  selectedBreed: 'default',
  catList: [] as Cat[],
  breedList: [] as Breed[],
  error: null,
  disappear: false,
};

function App() {
  const [selectedCat, setSelectedCat] = useState<Cat>({} as Cat);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <Home
            setSelectedCat={setSelectedCat}
            state={state}
            dispatch={dispatch}
          />
        )}
      ></Route>
      <Route
        path="/:id"
        render={() => <CatPage selectedCat={selectedCat} dispatch={dispatch} />}
      />
    </Switch>
  );
}

export default App;
