import { Breed } from '../types/Breed';
import { Cat } from '../types/Cat';
import { filterCats } from '../utils/utilities';

export interface State {
  loading: boolean;
  selectedBreed: string;
  breedList: Breed[];
  catList: Cat[];
  error: Error | null;
  disappear: boolean;
}

export type Action =
  | { type: 'select'; selectedBreed: string }
  | { type: 'breedListLoaded'; breedList: Breed[] }
  | { type: 'catListLoaded'; catList: Cat[] }
  | { type: 'reset'; catList: Cat[] }
  | { type: 'button' }
  | { type: 'error'; error: Error };

export const reducer = (state: State, action: Action) => {
  // filter through payload to ensure cats already in cat list are removed.
  if (action.type === 'catListLoaded') {
    const filteredCats = filterCats(state, action.catList);
    const newCats = [...state.catList, ...filteredCats];
    action.catList = newCats;
    if (filteredCats.length === 0) {
      state.disappear = true;
    }
  }

  switch (action.type) {
    case 'select':
      return {
        ...state,
        loading: true,
        selectedBreed: action.selectedBreed,
        catList: [] as Cat[],
        disappear: false,
      };
    case 'breedListLoaded':
      return {
        ...state,
        loading: false,
        breedList: action.breedList,
      };
    case 'catListLoaded':
      return {
        ...state,
        loading: false,
        catList: action.catList,
      };
    case 'reset':
      return {
        ...state,
        loading: false,
        catList: action.catList,
      };
    case 'button':
      return {
        ...state,
        loading: true,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
};
