import { useState } from 'react';
import { Switch, Route } from 'react-router';
import { Home } from './routes/Home/Home';
import { CatPage } from './routes/CatPage/CatPage';
import { Cat } from './types/Cat';
import './styles/main.scss';

function App() {
  const [selectedCat, setSelectedCat] = useState<Cat>({} as Cat);
  const [catList, setCatList] = useState<Cat[]>([]);
  const [selectedBreed, setSelectedBreed] = useState('default');

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <Home
            setSelectedCat={setSelectedCat}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
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
            setSelectedBreed={setSelectedBreed}
          />
        )}
      />
    </Switch>
  );
}

export default App;
