import { useState, useEffect } from 'react';
import { useGetCats } from '../../hooks/useGetCats';
import BreedList from '../../components/BreedList/BreedList';
import CatList from '../../components/CatList/CatList';
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
    catList: Cat[];
    error: Error | null;
  };
  dispatch: React.Dispatch<Action>;
}

export const Home = ({ setSelectedCat, state, dispatch }: Props) => {
  const [disappear, setDisappear] = useState(false);
  const service = useGetCats({ setDisappear, state });

  // Handle cat list fetch success or fail state
  useEffect(() => {
    if (service.status === 'loaded') {
      const { payload } = service;
      const newCats = [...state.catList, ...payload];
      dispatch({ type: 'loaded', catList: newCats });
    } else if (service.status === 'error') {
      dispatch({ type: 'error', error: service.error });
    }
  }, [service.status]);

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
            state={state}
            dispatch={dispatch}
            setDisappear={setDisappear}
          />
        </Row>
        <Row>
          <CatList catList={state.catList} setSelectedCat={setSelectedCat} />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            {!disappear && (
              <Button
                variant="success"
                disabled={
                  state.catList.length === 0 || state.fetchMore ? true : false
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
      {state.error && <Error error={state.error} />}
    </main>
  );
};
