import { Cat } from '../types/Cat';
import { State } from '../reducers/reducers';

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
