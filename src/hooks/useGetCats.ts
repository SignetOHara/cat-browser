import { memo, useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Cat } from '../types/Cat';

interface Props {
  setDisappear: React.Dispatch<React.SetStateAction<boolean>>;
  state: {
    disabled: boolean;
    fetchMore: boolean;
    selectedBreed: string;
    catList: Cat[];
    error: Error | null;
  };
}

export const useGetCats = ({ setDisappear, state }: Props) => {
  const [result, setResult] = useState<Service<Cat[]>>({
    status: 'loading',
  });

  useEffect(() => {
    if (state.selectedBreed === 'default') return;

    setResult({ status: 'loading' });
    const fetchCatList = async () => {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('x-api-Key', process.env.REACT_APP_CAT_API as string);
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
      let filteredCats: Cat[] = [];

      // Initial fetch
      if (state.catList.length === 0) {
        setResult({ status: 'loaded', payload: responseData });
      } else {
        // Store current IDs in catList inside a constant.
        const mappedCatIds = state.catList.map((catObj) => catObj.id);
        // Filter through most recent fetch, only saving cats that don't already have IDs in catlist
        filteredCats = responseData.filter(
          (cat: Cat) => !mappedCatIds.includes(cat.id)
        );
        // Add filtered cats to the payload.
        setResult({ status: 'loaded', payload: filteredCats });
      }
      // Hide load more button if no more cats to be added to list
      if (state.catList.length > 0 && filteredCats.length === 0) {
        setDisappear(true);
      }
    };
    try {
      fetchCatList();
    } catch (error: any) {
      setResult({ status: 'error', error });
    }
  }, [state.selectedBreed, state.fetchMore]);

  return result;
};
