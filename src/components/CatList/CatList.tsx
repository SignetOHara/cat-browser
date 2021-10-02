import Col from 'react-bootstrap/Col';
import { Cat } from '../../types/Cat';
import { CatCard } from './Card/CatCard';
import styles from './CatList.module.scss';

interface Props {
  catList: Cat[];
  setSelectedCat: React.Dispatch<React.SetStateAction<Cat>>;
  setLoadingCatImg: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatList = ({
  catList,
  setSelectedCat,
  setLoadingCatImg,
}: Props) => {
  if (catList.length === 0) {
    return (
      <Col xs={12} className={styles.noCats}>
        No cats available
      </Col>
    );
  } else {
    return (
      <>
        {catList.map((cat) => (
          <CatCard
            key={cat.id}
            setSelectedCat={setSelectedCat}
            cat={cat}
            setLoadingCatImg={setLoadingCatImg}
          />
        ))}
      </>
    );
  }
};
