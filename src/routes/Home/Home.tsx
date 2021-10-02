import { useState } from 'react';
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
  setLoadingCatImg: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Home = ({
  setSelectedCat,
  selectedBreed,
  setSelectedBreed,
  catList,
  setCatList,
  setLoadingCatImg,
}: Props) => {
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [disappear, setDisappear] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useGetCats({
    isLoaded,
    setIsLoaded,
    setIsLoading,
    catList,
    setCatList,
    setDisappear,
    selectedBreed,
    page,
  });

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(1);
  };

  return (
    <main className={styles.home}>
      <Container className={styles.container}>
        <header>
          <h1>Cat Browser</h1>
        </header>
        <Row className={styles.breedList}>
          <BreedList
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            setError={setError}
            setCatList={setCatList}
            setPage={setPage}
            setDisappear={setDisappear}
            setDisabled={setDisabled}
          />
        </Row>
        <Row>
          <CatList
            catList={catList}
            setSelectedCat={setSelectedCat}
            setLoadingCatImg={setLoadingCatImg}
          />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <Button
              variant="success"
              disabled={disabled}
              className={disappear ? styles.disappear : ''}
              onClick={handleLoadMore}
            >
              {isLoading ? 'Loading cats...' : 'Load more'}
            </Button>
          </Col>
        </Row>
      </Container>
      {error && <Error error={error} setError={setError} />}
    </main>
  );
};
