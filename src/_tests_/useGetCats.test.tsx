import { renderHook } from '@testing-library/react-hooks';
import { useGetBreeds } from '../hooks/useGetBreeds';

describe('Fetch BreedList', () => {
  test('status === loading on initial fetch', () => {
    const { result } = renderHook(() => useGetBreeds());
    expect(result.current.status).toEqual('loading');
  });

  test('status === loaded on a successful fetch', async () => {
    const { result, waitFor } = renderHook(() => useGetBreeds());
    await waitFor(() => expect(result.current.status).toEqual('loaded'), { timeout: 8000 });
  }, 10000);
});