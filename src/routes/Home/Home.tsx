import { useState, useEffect } from 'react';
import { useGetCats } from '../../hooks/useGetCats';
import { BreedList } from '../../components/BreedList/BreedList';
import { CatList } from '../../components/CatList/CatList';
import { Error } from '../../components/Error/Error';
import { Cat } from '../../types/Cat';
import { Action } from '../../reducers/reducers';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';

interface Props {
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
  state: {
    disabled: boolean;
    fetchMore: boolean;
    selectedBreed: string;
  };
  dispatch: React.Dispatch<Action>;
  catList: Cat[];
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
}

export const Home = ({
  setSelectedCat,
  state,
  dispatch,
  catList,
  setCatList,
}: Props) => {
  const [error, setError] = useState<Error>();
  const [disappear, setDisappear] = useState(false);

  const service = useGetCats({
    catList,
    setDisappear,
    state,
  });

  // Handle cat list fetch success or fail state
  useEffect(() => {
    if (service.status === 'loaded') {
      setCatList((prevCats) => [...prevCats, ...service.payload]);
      dispatch({ type: 'loaded' });
    } else if (service.status === 'error') {
      setError(service.error);
      dispatch({ type: 'loaded' });
    }
  }, [service, setError, setCatList]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'button' });
  };

  return (
    <main className={styles.home}>
      <Container className={styles.container}>
        <header>
          <h1 className={styles.title}>Cat Browser</h1>
        </header>
        <Row className={styles.breedList}>
          <BreedList
            selectedBreed={state.selectedBreed}
            dispatch={dispatch}
            setError={setError}
            setCatList={setCatList}
            setDisappear={setDisappear}
            disabled={state.disabled}
          />
        </Row>
        <Row>
          <CatList catList={catList} setSelectedCat={setSelectedCat} />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            {!disappear && (
              <Button
                variant="success"
                disabled={
                  catList.length === 0 || state.fetchMore ? true : false
                }
                onClick={handleClick}
              >
                {state.selectedBreed === 'default' || !state.disabled
                  ? 'Load more'
                  : 'Loading cats...'}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {error && <Error error={error} />}
    </main>
  );
};
