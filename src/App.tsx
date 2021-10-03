import { useState, useReducer } from 'react';
import { Switch, Route } from 'react-router';
import { Home } from './routes/Home/Home';
import { reducer } from './reducers/reducers';
import { CatPage } from './routes/CatPage/CatPage';
import { Cat } from './types/Cat';
import './styles/main.scss';

const initialState = {
  disabled: true,
  fetchMore: false,
  selectedBreed: 'default',
};

function App() {
  const [selectedCat, setSelectedCat] = useState<Cat>({} as Cat);
  const [catList, setCatList] = useState<Cat[]>([]);
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
            catList={catList}
            setCatList={setCatList}
          />
        )}
      ></Route>
      <Route
        path="/:id"
        render={() => (
          <CatPage
            selectedCat={selectedCat}
            setCatList={setCatList}
            dispatch={dispatch}
          />
        )}
      />
    </Switch>
  );
}

export default App;
