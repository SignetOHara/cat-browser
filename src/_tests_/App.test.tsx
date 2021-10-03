import { render, screen } from '@testing-library/react';
import { Home } from '../routes/Home/Home';

describe('Home component', () => {
  const setState = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setState(0)];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Cat Browser heading', () => {
    render(
      <Home
        setSelectedCat={setState}
        state={useStateMock}
        dispatch={setState}
      />
    );
    const header = screen.getByText(/Cat Browser/i);
    expect(header).toBeInTheDocument();
  });
});
