import { useReducer } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>,
];

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

export const useMutation = <TData = unknown, TVariables = unknown>(
  query: string,
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, disPatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariables) => {
    try {
      disPatch({ type: 'FETCH' });

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });

      if (errors !== null && errors !== undefined && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      disPatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      disPatch({ type: 'FETCH_ERROR' });

      // eslint-disable-next-line no-console
      console.error('[Error] failed to delete the listing');
    }
  };

  return [fetch, state];
};
