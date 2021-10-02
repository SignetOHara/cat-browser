import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Cat } from '../../../types/Cat';
import styles from './CatCard.module.scss';

interface Props {
  cat: Cat;
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
  setLoadingCatImg: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatCard = ({ cat, setSelectedCat, setLoadingCatImg }: Props) => {
  const handleSelectCat = () => {
    setLoadingCatImg(true);
    setSelectedCat(cat);
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
          <Button href={cat.id} variant="primary" onClick={handleSelectCat}>
            View details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
