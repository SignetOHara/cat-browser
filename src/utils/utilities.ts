import { Cat } from '../types/Cat';
import { State, Action } from '../reducers/reducers';

export const filterCats = (state: State, payload: Cat[]) => {
  let filteredCats: Cat[] = [];
  // Initial fetch
  if (state.catList.length === 0) {
    return payload;
  } else {
    // Store current IDs in catList inside a constant.
    const mappedCatIds = state.catList.map((catObj) => catObj.id);
    // Filter through most recent fetch, only saving cats that don't already have IDs in catlist
    filteredCats = payload.filter((cat: Cat) => !mappedCatIds.includes(cat.id));
    return filteredCats;
  }
};

export const handleData = (
  data: Cat[],
  state: State,
  dispatch: React.Dispatch<Action>,
  setDisappear: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newCats = [...state.catList, ...data];
  dispatch({ type: 'catListLoaded', catList: newCats });
  if (data.length === 0) {
    setDisappear(true);
  }
};
