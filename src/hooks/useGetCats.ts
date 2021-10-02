import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { Cat } from '../types/Cat';

interface Props {
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  catList: Cat[];
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
  setDisappear: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBreed: string;
  page: number;
}

export const useGetCats = ({
  isLoaded,
  setIsLoaded,
  setIsLoading,
  catList,
  setCatList,
  setDisappear,
  selectedBreed,
  page,
}: Props) => {
  const [result, setResult] = useState<Service<Cat[]>>({
    status: 'loading',
  });

  // Populate the Cat Cards
  const fetchCatList = async () => {
    setIsLoaded(true);
    setIsLoading(true);

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('x-api-Key', process.env.REACT_APP_CAT_API as string);
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${selectedBreed}`,
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
    if (catList.length === 0) {
      setCatList(responseData);
    } else {
      // Store current IDs in catList inside a constant.
      const mappedCatIds = catList.map((catObj) => catObj.id);
      // Filter through most recent fetch, only saving cats that don't already have IDs in catlist
      filteredCats = responseData.filter(
        (cat: Cat) => !mappedCatIds.includes(cat.id)
      );
      // Add filtered cats to the catList.
      setCatList((prevCats) => [...prevCats, ...filteredCats]);
    }
    // Hide load more button if no more cats to be added to list
    if (catList.length > 0 && filteredCats.length === 0) {
      setDisappear(true);
    }
    setIsLoading(false);
  };

  // If a new breed selected in dropdown - set isLoaded to false
  useEffect(() => {
    setIsLoaded(false);
  }, [selectedBreed]);

  // If isLoaded is false, call fetchCatList
  if (!isLoaded) {
    try {
      fetchCatList();
    } catch (error: any) {
      setResult({ status: 'error', error });
    }
  }
  return result;
};
