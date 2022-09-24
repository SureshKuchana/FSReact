import { server } from './server';
import { useEffect, useCallback, useReducer } from 'react';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };

const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { data: action.payload, loading: false, error: false };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: true };
      default:
        throw new Error();
    }
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, disPatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchAPI = async () => {
      try {
        disPatch({ type: 'FETCH' });
        const { data, errors } = await server.fetch<TData>({ query });
        if (errors !== null && errors !== undefined && errors.length > 0) {
          throw new Error(errors[0].message);
        }
        disPatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        disPatch({ type: 'FETCH_ERROR' });
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, no-console
        console.error('[Error] failed to fetch the listings');
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchAPI();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
