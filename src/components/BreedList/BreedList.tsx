import { useState, useEffect } from 'react';
import { useGetBreeds } from '../../hooks/useGetBreeds';
import { Breed } from '../../types/Breed';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styles from './BreedList.module.scss';

export const BreedList = () => {
  const [breedList, setBreedList] = useState<Breed[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>();
  const [selectedBreed, setSelectedBreed] = useState<string>();

  const service = useGetBreeds();
  console.log(service);

  // handle fetch error Message as an alert / banner: “Apologies but we could not load new cats for you at this time! Miau!

  useEffect(() => {
    if (service.status === 'loaded') {
      setBreedList(service.payload);
      setLoading(false);
    } else if (service.status === 'error') {
      setError(service.error);
      setLoading(false);
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
  };

  return (
    <Col sm={6} md={3} xs={12}>
      <Form.Group className={styles.formGroup} controlId="breedList">
        <Form.Label htmlFor="breed">Breed</Form.Label>
        <Form.Select
          id="breed"
          aria-label="Select Breed"
          value={selectedBreed}
          onChange={handleChange}
          disabled={loading}
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
