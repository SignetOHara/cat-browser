import { render } from '@testing-library/react';
import { Cat } from '../types/Cat';
import { Home } from '../routes/Home/Home';

const initialState = {
  // disabled: true,
  // fetchMore: false,
  loading: true,
  selectedBreed: 'default',
  catList: [] as Cat[],
  error: null,
};

describe('Home component', () => {
  const setState = jest.fn();
  const mockDispatch = jest.fn();

  test('renders Cat Browser heading', () => {
    const { getByText } = render(
      <Home
        setSelectedCat={setState}
        state={initialState}
        dispatch={mockDispatch}
      />
    );
    const header = getByText(/Cat Browser/i);
    const buttonStatus = getByText(/Load more/i);
    expect(header).toBeTruthy();
    expect(buttonStatus).toBeTruthy();
  });
});

describe('Home component not disabled', () => {
  const setState = jest.fn();
  const mockDispatch = jest.fn();



  test('renders Cat Browser heading', () => {
    const { getByText } = render(
      <Home
        setSelectedCat={setState}
        state={initialState}
        dispatch={mockDispatch}
      />
    );
    const header = getByText(/Cat Browser/i);
    const buttonStatus = getByText(/Loading cats.../i);
    expect(header).toBeTruthy();
    expect(buttonStatus).toBeTruthy();
  });
});
