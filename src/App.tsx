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
  const [loadingCatImg, setLoadingCatImg] = useState(false);

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
            setLoadingCatImg={setLoadingCatImg}
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
            loadingCatImg={loadingCatImg}
            setLoadingCatImg={setLoadingCatImg}
          />
        )}
      />
    </Switch>
  );
}

export default App;
