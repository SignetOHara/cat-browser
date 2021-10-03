import { memo, useEffect } from 'react';
import { useGetBreeds } from '../../hooks/useGetBreeds';
import { Action, State } from '../../reducers/reducers';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styles from './BreedList.module.scss';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const BreedList = ({ state, dispatch }: Props) => {
  const service = useGetBreeds();

  // If breedList successfully loaded, dispatch payload. If not, dispatch error
  useEffect(() => {
    if (service.status === 'loaded') {
      dispatch({ type: 'breedListLoaded', breedList: service.payload });
    } else if (service.status === 'error') {
      dispatch({ type: 'error', error: service.error });
    }
  }, [service, dispatch]);

  // Dispatches select action if user clicks a new item on drop down
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    dispatch({ type: 'select', selectedBreed: breed });
  };

  // Dispatches reset action once breedlist already loaded and default drop down selected
  useEffect(() => {
    if (state.breedList && state.selectedBreed === 'default') {
      dispatch({ type: 'reset', catList: [] });
    }
  }, [dispatch, state.breedList, state.selectedBreed]);

  return (
    <Col xs={12} sm={6} md={3}>
      <Form.Group className={styles.formGroup}>
        <Form.Label htmlFor="breed">Breed</Form.Label>
        <Form.Select
          id="breed"
          aria-label="Select Breed"
          value={state.selectedBreed}
          onChange={handleChange}
          disabled={state.loading || state.breedList.length === 0}
        >
          <option value="default">Select breed</option>
          {state.breedList &&
            state.breedList.map((breed) => (
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
