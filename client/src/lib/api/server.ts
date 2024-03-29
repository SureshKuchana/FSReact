interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('[Error] failed to fetch from server');
    }

    return res.json() as Promise<{ data: TData; errors: Error[] }>;
  },
};
