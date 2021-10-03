import { Cat } from '../types/Cat';
import { filterCats } from '../utils/utilities';

export interface State {
  loading: boolean;
  selectedBreed: string;
  catList: Cat[];
  error: Error | null;
}

export type Action =
  | { type: 'select'; selectedBreed: string }
  | { type: 'breedListLoaded' }
  | {
      type: 'catListLoaded';
      catList: Cat[];
      setDisappear: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | { type: 'reset'; catList: Cat[] }
  | { type: 'button' }
  | { type: 'error'; error: Error };

export const reducer = (state: State, action: Action) => {
  if (action.type === 'catListLoaded') {
    const filteredCats = filterCats(state, action.catList);
    const newCats = [...state.catList, ...filteredCats];
    action.catList = newCats;
    if (filteredCats.length === 0) {
      action.setDisappear(true);
    }
  }

  switch (action.type) {
    case 'select':
      return {
        ...state,
        loading: true,
        selectedBreed: action.selectedBreed,
        catList: [] as Cat[],
      };
    case 'breedListLoaded':
      return {
        ...state,
        loading: false,
      };
    case 'catListLoaded':
      return {
        ...state,
        loading: false,
        catList: action.catList,
        disappear: action.setDisappear,
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
