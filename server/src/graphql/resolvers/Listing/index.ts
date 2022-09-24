import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export const listingResolvers: IResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listings: async (
      _root: undefined,
      // eslint-disable-next-line @typescript-eslint/ban-types
      _args: {},
      { db }: { db: Database },
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database },
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      console.log(' deleteRes ', deleteRes);
      if (!deleteRes.value) {
        throw new Error(' failed to delete listings');
      }
      return deleteRes.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
