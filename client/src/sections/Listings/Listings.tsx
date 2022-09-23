import React from 'react';
import { server } from '../../lib/api';
import { ListingsData } from './types';

const LISTINGS = `
  query Listings{
    listings{
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await server.fetch({ query: LISTINGS });
  };
  return (
    <>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Refresh</button>
    </>
  );
};
