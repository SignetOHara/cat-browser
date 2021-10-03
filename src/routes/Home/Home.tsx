import { useState, useEffect } from 'react';
import { useGetCats } from '../../hooks/useGetCats';
import { Error } from '../../components/Error/Error';
import { Cat } from '../../types/Cat';
import { Action, State } from '../../reducers/reducers';
import { filterCats, handleData } from '../../utils/utilities';
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
  const [disappear, setDisappear] = useState(false);
  const service = useGetCats({ state });

  // useEffect(() => {
  //   if (service.status === 'loaded') {
  //     const cats = filterCats(state, service.payload);
  //     handleData(cats, state, dispatch, setDisappear);
  //   } else if (service.status === 'error') {
  //     dispatch({ type: 'error', error: service.error });
  //   }
  // }, [service, dispatch]);

  useEffect(() => {
    if (service.status === 'loaded') {
      const cats = service.payload;
      // const cats = filterCats(state, service.payload);
      handleData(cats, state, dispatch, setDisappear);
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
