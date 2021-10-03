import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Cat } from '../types/Cat';
import { State } from '../reducers/reducers';

interface Props {
  state: State;
}

export const useGetCats = ({ state }: Props) => {
  const [result, setResult] = useState<Service<Cat[]>>({
    status: 'loading',
  });

  useEffect(() => {
    if (state.selectedBreed === 'default' || !state.loading) {
      return;
    }

    const fetchCatList = async () => {
      try {
        setResult({ status: 'loading' });
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set(
          'x-api-Key',
          process.env.REACT_APP_CAT_API as string
        );
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=${state.selectedBreed}`,
          {
            headers: requestHeaders,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setResult({ status: 'loaded', payload: responseData });
      } catch (error: any) {
        setResult({ status: 'error', error });
      }
    };
    fetchCatList();
  }, [state.selectedBreed, state.loading]);

  return result;
};
