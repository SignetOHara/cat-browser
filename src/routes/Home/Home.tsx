import { useState } from 'react';
import { BreedList } from '../../components/BreedList/BreedList';
import { Error } from '../../components/Error/Error';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';

interface Props {}

export const Home = (props: Props) => {
  const [error, setError] = useState<Error>();

  return (
    <main className={styles.home}>
      <Container className={styles.container}>
        {/* Check bootstrap header */}
        <header>
          <h1>Cat Browser</h1>
        </header>
        <Row className={styles.breedList}>
          <BreedList setError={setError} />
        </Row>
      </Container>
      {error && <Error error={error} setError={setError} />}
    </main>
  );
};
