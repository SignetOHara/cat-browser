import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Cat } from '../../../types/Cat';
import styles from './CatCard.module.scss';
import { useHistory } from 'react-router-dom';

interface Props {
  cat: Cat;
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
}

export const CatCard = ({ cat, setSelectedCat }: Props) => {
  const history = useHistory();

  const handleSelectCat = () => {
    setSelectedCat(cat);
    history.push(cat.id);
  };

  return (
    <Col xs={12} sm={6} md={3}>
      <Card className={styles.card}>
        <Card.Img
          variant="top"
          src={cat.url}
          alt={`An ${cat.breeds[0].name} cat`}
        />
        <Card.Body>
          <Button onClick={handleSelectCat} variant="primary">
            View details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
