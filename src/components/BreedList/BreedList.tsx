import { memo, useState, useEffect } from 'react';
import { useGetBreeds } from '../../hooks/useGetBreeds';
import { Action, State } from '../../reducers/reducers';
import { Breed } from '../../types/Breed';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styles from './BreedList.module.scss';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  setDisappear: React.Dispatch<React.SetStateAction<boolean>>;
}

const BreedList = ({ state, setDisappear, dispatch }: Props) => {
  const [breedList, setBreedList] = useState<Breed[]>();
  const service = useGetBreeds();

  // Handle breed list fetch success or fail state
  useEffect(() => {
    if (service.status === 'loaded') {
      setBreedList(service.payload);
      dispatch({ type: 'breedListLoaded' });
    } else if (service.status === 'error') {
      dispatch({ type: 'error', error: service.error });
    }
  }, [service, dispatch]);

  // Handle user selecting a different breed in drop down - clears catList, redisplays load button
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    dispatch({ type: 'select', selectedBreed: breed });
    setDisappear(false);
  };

   // handle user selecting default once breedlist already loaded
  useEffect(() => {
    if (breedList && state.selectedBreed === 'default') {
      dispatch({ type: 'reset', catList: [] });
    }
  }, [dispatch, breedList, state.selectedBreed]);

  return (
    <Col xs={12} sm={6} md={3}>
      <Form.Group className={styles.formGroup}>
        <Form.Label htmlFor="breed">Breed</Form.Label>
        <Form.Select
          id="breed"
          aria-label="Select Breed"
          value={state.selectedBreed}
          onChange={handleChange}
          disabled={state.disabled}
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

export default memo(BreedList);
