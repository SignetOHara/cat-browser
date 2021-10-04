import { useEffect } from 'react';
import { useGetCats } from '../../hooks/useGetCats';
import { Error } from '../../components/Error/Error';
import { Cat } from '../../types/Cat';
import { Action, State } from '../../reducers/reducers';
import BreedList from '../../components/BreedList/BreedList';
import CatList from '../../components/CatList/CatList';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';

interface Props {
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const Home = ({ setSelectedCat, state, dispatch }: Props) => {
  const service = useGetCats({ state });

  // If service successfully loaded, dispatch payload. If not, dispatch error
  useEffect(() => {
    if (service.status === 'loaded') {
      dispatch({
        type: 'catListLoaded',
        catList: service.payload,
      });
    } else if (service.status === 'error') {
      dispatch({ type: 'error', error: service.error });
    }
  }, [service, dispatch]);

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
          <BreedList state={state} dispatch={dispatch} />
        </Row>
        <Row>
          <CatList catList={state.catList} setSelectedCat={setSelectedCat} />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            {!state.disappear && (
              <Button
                variant="success"
                type="button"
                disabled={state.catList.length === 0 || state.loading}
                onClick={handleClick}
              >
                {state.selectedBreed === 'default' || !state.loading
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
