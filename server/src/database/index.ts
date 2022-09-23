import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;

const url = `mongodb+srv://${username}:${password}@cluster0.ww4pv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectDB = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
