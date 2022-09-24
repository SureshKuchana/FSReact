import React, { FC } from 'react';
import { useQuery, useMutation } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
  Listing,
} from './types';

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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: FC<Props> = ({ title }) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListLoading, error: deleteListError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  // delete a listing & re fetch the listings
  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data !== null ? data.listings : [];

  const listingsList =
    listings.length > 0 ? (
      <ul>
        {listings.map((listing: Listing) => {
          return (
            <li key={listing.id}>
              {listing.title}&nbsp;&nbsp;
              <button
                onClick={async () => {
                  await handleDeleteListing(listing.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    ) : null;

  if (loading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>Error :</h2>;
  }

  const deleteListingLoadingMessage = deleteListLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListError ? (
    <h4>
      Uh oh! Something went wrong with deleting - Please try again later :(...
    </h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
