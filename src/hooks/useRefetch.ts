import { Cat } from '../types/Cat';

interface Props {
  setCatList: React.Dispatch<React.SetStateAction<Cat[]>>;
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>;
  // id: 
}

export const handleRefetch = async ({
  setCatList,
  setSelectedBreed,
}: Props) => {
  // Set catList back to empty first
  setCatList(() => []);
  // setSelectedBreed(id);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('x-api-Key', process.env.REACT_APP_CAT_API as string);
  // const response = await fetch(
    // `https://api.thecatapi.com/v1/images/search?breed_id=${id}`,
    // {
    //   headers: requestHeaders,
    // }
  // );

  // Throw error if http error
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  // const responseData = await response.json();
  // setCatList((cats) => [...cats, ...responseData]);
};
