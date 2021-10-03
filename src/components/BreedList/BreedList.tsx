import { useState, useEffect } from 'react';
import { useGetBreeds } from '../../hooks/useGetBreeds';
import { Action } from '../../reducers/reducers';
import { Breed } from '../../types/Breed';
import { Cat } from '../../types/Cat';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styles from './BreedList.module.scss';

interface Props {
  selectedBreed: string;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
  setDisappear: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  dispatch: React.Dispatch<Action>;
}

export const BreedList = ({
  setError,
  setSelectedBreed,
  selectedBreed,
  setCatList,
  setDisappear,
  disabled,
  dispatch,
}: Props) => {
  const [breedList, setBreedList] = useState<Breed[]>();

  const service = useGetBreeds();

  // Handle breed list fetch success or fail state
  useEffect(() => {
    if (service.status === 'loaded') {
      setBreedList(service.payload);
      dispatch({ type: 'loaded' });
    } else if (service.status === 'error') {
      setError(service.error);
      dispatch({ type: 'loaded' });
    }
  }, [service, setError, dispatch]);

  // Handle user selecting a different breed in drop down - clears catList, redisplays load button
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    dispatch({ type: 'select' });
    setSelectedBreed(breed);
    setCatList([]);
    setDisappear(false);
  };

  // handle user selecting default once breedlist already loaded
  useEffect(() => {
    if (breedList && selectedBreed === 'default') {
      dispatch({ type: 'loaded' });
    }
  }, [dispatch, breedList, selectedBreed]);

  return (
    <Col xs={12} sm={6} md={3}>
      <Form.Group className={styles.formGroup}>
        <Form.Label htmlFor="breed">Breed</Form.Label>
        <Form.Select
          id="breed"
          aria-label="Select Breed"
          value={selectedBreed}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="default">Select breed</option>
          {breedList &&
            breedList.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
    </Col>
  );
};
