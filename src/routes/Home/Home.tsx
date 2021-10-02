import { useState, useEffect } from 'react';
import { useGetCats } from '../../hooks/useGetCats';
import { BreedList } from '../../components/BreedList/BreedList';
import { CatList } from '../../components/CatList/CatList';
import { Error } from '../../components/Error/Error';
import { Cat } from '../../types/Cat';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import styles from './Home.module.scss';

interface Props {
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
  selectedBreed: string;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  catList: Cat[];
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
}

export const Home = ({
  setSelectedCat,
  selectedBreed,
  setSelectedBreed,
  catList,
  setCatList,
}: Props) => {
  const [error, setError] = useState<Error>();
  const [loadMore, setLoadMore] = useState(false);
  const [disappear, setDisappear] = useState(false);

  const service = useGetCats({
    selectedBreed,
    loadMore,
    setLoadMore,
    catList,
    setDisappear,
  });

  // Handle cat list fetch success or fail state
  useEffect(() => {
    if (service.status === 'loaded') {
      setCatList((prevCats) => [...prevCats, ...service.payload]);
    } else if (service.status === 'error') {
      setError(service.error);
    }
  }, [service, setError, setCatList]);

  console.log(service);

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoadMore(true);
  };

  return (
    <main className={styles.home}>
      <Container className={styles.container}>
        <header>
          <h1 className={styles.title}>Cat Browser</h1>
        </header>
        <Row className={styles.breedList}>
          <BreedList
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            setError={setError}
            catList={catList}
            setCatList={setCatList}
            setDisappear={setDisappear}
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
                disabled={catList.length === 0 ? true : false}
                onClick={handleLoadMore}
              >
                {service.status === 'loading' ? 'Loading cats...' : 'Load more'}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {error && <Error error={error} />}
    </main>
  );
};
