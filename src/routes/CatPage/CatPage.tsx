import { useState } from 'react';
import { useHistory } from 'react-router';
import { Cat } from '../../types/Cat';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './CatPage.module.scss';

interface Props {
  selectedCat: Cat;
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
}

export const CatPage = ({
  selectedCat,
  setCatList,
  setSelectedBreed,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const catInfo = selectedCat.breeds;

  const { id, name, origin, temperament, description } = catInfo[0];

  const handleReFetch = () => {
    setCatList([]);
    history.push(`/?breed=${id}`);
    setSelectedBreed(id);
  };

  return (
    <div className={styles.cat}>
      <Container>
        {loading && <h1 className={styles.loading}>Loading...</h1>}
        <Card style={!loading ? { display: 'block' } : { display: 'none' }}>
          <Card.Header>
            <Button variant="primary" onClick={handleReFetch}>
              Back
            </Button>
          </Card.Header>
          <Card.Img
            src={selectedCat.url}
            alt={name}
            onLoad={() => setLoading(false)}
          />
          <Card.Body>
            <h1>{name}</h1>
            <h2>{`Origin: ${origin}`}</h2>
            <h3>{temperament}</h3>
            <p className={styles.cardP}>{description}</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
