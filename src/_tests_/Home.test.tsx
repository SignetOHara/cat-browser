import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cat } from '../types/Cat';
import { Breed } from '../types/Breed';
import { Home } from '../routes/Home/Home';

const initialState = {
  loading: true,
  selectedBreed: 'default',
  catList: [] as Cat[],
  breedList: [] as Breed[],
  error: null,
  disappear: false,
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
    userEvent.click(getByText('Load more'));
    
    expect(getByText(/Load more/i)).toBeTruthy();
    expect(header).toBeTruthy();
    expect(buttonStatus).toBeTruthy();
  });
});
