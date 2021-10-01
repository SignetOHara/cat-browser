import { BreedList } from '../../components/BreedList/BreedList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.scss';

interface Props {}

export const Home = (props: Props) => {
  return (
    <main className={styles.home}>
      <Container>
        {/* Check bootstrap header */}
        <header>
          <h1>Cat Browser</h1>
        </header>
        <Row>
          <BreedList />
        </Row>
      </Container>
    </main>
  );
};
