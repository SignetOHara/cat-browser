import { Cat } from '../types/Cat';
import { filterCats } from '../utils/utilities';

export interface State {
  disabled: boolean;
  fetchMore: boolean;
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
        disabled: true,
        fetchMore: false,
        selectedBreed: action.selectedBreed,
        catList: [] as Cat[],
        error: null,
      };
    case 'breedListLoaded':
      return {
        disabled: false,
        fetchMore: false,
        selectedBreed: state.selectedBreed,
        catList: state.catList,
        error: null,
      };
    case 'catListLoaded':
      return {
        disabled: false,
        fetchMore: false,
        selectedBreed: state.selectedBreed,
        catList: action.catList,
        disappear: action.setDisappear,
        error: null,
      };
    case 'reset':
      return {
        disabled: false,
        fetchMore: false,
        selectedBreed: state.selectedBreed,
        catList: action.catList,
        error: null,
      };
    case 'button':
      return {
        disabled: true,
        fetchMore: true,
        selectedBreed: state.selectedBreed,
        catList: state.catList,
        error: null,
      };
    case 'error':
      return {
        disabled: false,
        fetchMore: false,
        selectedBreed: state.selectedBreed,
        error: action.error,
        catList: state.catList,
      };
    default:
      throw new Error();
  }
};
