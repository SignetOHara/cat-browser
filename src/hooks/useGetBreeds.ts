import { useEffect, useState } from 'react';

import { Service } from '../types/Service';
import { Breed } from '../types/Breed';

export interface Breeds {
  results: Breed[];
}

export const useGetBreeds = () => {
  const [result, setResult] = useState<Service<Breeds>>({
    status: 'loading',
  });

  useEffect(() => {
    const fetchBreedList = async () => {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('x-api-Key', process.env.REACT_APP_CAT_API as string);

      const response = await fetch('https://api.thecatapi.com/v1/breeds/', {
        headers: requestHeaders,
      });

      // Throw error if http error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setResult({ status: 'loaded', payload: responseData });
    };
    try {
      fetchBreedList();
    } catch (error) {
      setResult({ status: 'error', error });
    }
  }, []);

  return result;
};
