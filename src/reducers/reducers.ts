interface State {
  disabled: boolean;
  fetchMore: boolean;
  selectedBreed: string;
}

type SelectAction = {
  type: 'select',
  selectedBreed: string,
}

type OtherAction = {
  type: 'loaded' | 'button',
}

export type Action = SelectAction | OtherAction

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'loaded':
      return {
        disabled: false,
        fetchMore: false,
        selectedBreed: state.selectedBreed,
      };
    case 'select':
      return {
        disabled: true,
        fetchMore: false,
        selectedBreed: action.selectedBreed,
      };
    case 'button':
      return {
        disabled: true,
        fetchMore: true,
        selectedBreed: state.selectedBreed,
      };
    default:
      throw new Error();
  }
};
