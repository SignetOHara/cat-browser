import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Breed } from '../types/Breed';

export const useGetBreeds = () => {
  const [result, setResult] = useState<Service<Breed[]>>({
    status: 'loading',
  });

  useEffect(() => {
    const fetchBreedList = async () => {
      try {
        setResult({ status: 'loading' });
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set(
          'x-api-Key',
          process.env.REACT_APP_CAT_API as string
        );

        const response = await fetch('https://api.thecatapi.com/v1/breeds/', {
          headers: requestHeaders,
        });

        // Throw error if http error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setResult({ status: 'loaded', payload: responseData });
      } catch (error: any) {
        setResult({ status: 'error', error });
      }
    };
    fetchBreedList();
  }, []);

  return result;
};
