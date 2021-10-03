import { Cat } from '../types/Cat';

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
  | { type: 'catListLoaded'; catList: Cat[] }
  | { type: 'reset'; catList: Cat[] }
  | { type: 'button' }
  | { type: 'error'; error: Error };

export const reducer = (state: State, action: Action) => {
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
