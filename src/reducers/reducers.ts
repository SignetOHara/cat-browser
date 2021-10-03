interface Status {
  disabled: boolean;
  fetchMore: boolean;
}

export interface Action {
  type: string;
}

export const reducer = (state: Status, action: Action) => {
  switch (action.type) {
    case 'loaded':
      return {
        disabled: false,
        fetchMore: false,
      };
    case 'select':
      return {
        disabled: true,
        fetchMore: false,
      };
    case 'button':
      return {
        disabled: true,
        fetchMore: true,
      };
    default:
      throw new Error();
  }
};
